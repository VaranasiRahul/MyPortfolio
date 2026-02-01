#!/bin/bash
set -e

K3S_TOKEN=${K3S_TOKEN:-"your-secret-token-here"}
MASTER_IP=${MASTER_IP:-""}

echo "Installing k3s on master node"

export INSTALL_K3S_SKIP_ENABLE=false

curl -sfL https://get.k3s.io | sh -s - server \
  --write-kubeconfig-mode 644 \
  --disable traefik \
  --disable servicelb \
  --disable local-storage \
  --kube-apiserver-arg=default-not-ready-toleration-seconds=30 \
  --kube-apiserver-arg=default-unreachable-toleration-seconds=30 \
  --kubelet-arg=eviction-hard=memory.available<100Mi \
  --kubelet-arg=eviction-soft=memory.available<200Mi \
  --kubelet-arg=eviction-soft-grace-period=memory.available=1m30s \
  --kubelet-arg=kube-reserved=cpu=100m,memory=128Mi \
  --kubelet-arg=system-reserved=cpu=100m,memory=128Mi

sudo systemctl enable k3s
sudo systemctl start k3s

mkdir -p ~/.kube
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
sudo chown $(id -u):$(id -g) ~/.kube/config

sleep 30

echo "Installing Traefik manually"
kubectl apply -f https://raw.githubusercontent.com/traefik/traefik/v2.10/docs/content/reference/dynamic-configuration/kubernetes-crd-definition-v1.yml
kubectl apply -f https://raw.githubusercontent.com/traefik/traefik/v2.10/docs/content/reference/dynamic-configuration/kubernetes-crd-rbac.yml

cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: traefik-ingress-controller
  namespace: kube-system
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: traefik
  namespace: kube-system
  labels:
    app: traefik
spec:
  replicas: 1
  selector:
    matchLabels:
      app: traefik
  template:
    metadata:
      labels:
        app: traefik
    spec:
      serviceAccountName: traefik-ingress-controller
      containers:
      - name: traefik
        image: traefik:v2.10
        args:
        - --api.insecure=true
        - --providers.kubernetesingress=true
        - --entrypoints.web.address=:80
        - --log.level=INFO
        ports:
        - name: web
          containerPort: 80
        - name: admin
          containerPort: 8080
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "200m"
---
apiVersion: v1
kind: Service
metadata:
  name: traefik
  namespace: kube-system
spec:
  type: NodePort
  ports:
  - name: web
    port: 80
    targetPort: 80
    nodePort: 30080
  - name: admin
    port: 8080
    targetPort: 8080
  selector:
    app: traefik
EOF

echo "k3s installation complete"
echo "Kubeconfig saved to ~/.kube/config"
