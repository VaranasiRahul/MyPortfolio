#!/bin/bash
set -e

echo "Optimizing system for low memory"
swapoff -a
sed -i '/ swap / s/^/#/' /etc/fstab

echo "vm.swappiness=10" >> /etc/sysctl.conf
echo "vm.vfs_cache_pressure=50" >> /etc/sysctl.conf
sysctl -p

apt-get update
apt-get install -y curl wget git

echo "Installing k3s master"
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="server \
  --disable traefik \
  --disable servicelb \
  --disable local-storage \
  --write-kubeconfig-mode 644 \
  --kube-apiserver-arg=default-not-ready-toleration-seconds=30 \
  --kube-apiserver-arg=default-unreachable-toleration-seconds=30 \
  --kubelet-arg=eviction-hard=memory.available<100Mi \
  --kubelet-arg=eviction-soft=memory.available<200Mi \
  --kubelet-arg=eviction-soft-grace-period=memory.available=1m30s" \
  K3S_TOKEN="${k3s_token}" sh -

systemctl enable k3s
systemctl start k3s

sleep 30

mkdir -p /root/.kube
cp /etc/rancher/k3s/k3s.yaml /root/.kube/config

echo "k3s master installation complete"
