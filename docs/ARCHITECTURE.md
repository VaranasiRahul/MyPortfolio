# Architecture Deep Dive

## Overview

This document provides a comprehensive technical deep dive into the architecture of Rahul Varanasi's DevOps Portfolio project. The project has two distinct phases:

- **Phase 1 (Historical):** AWS-hosted infrastructure with Jenkins CI and k3s Kubernetes
- **Phase 2 (Current):** GitHub Actions CI/CD with Netlify hosting

---

## Phase 1 Architecture — AWS + Jenkins + k3s

### AWS Infrastructure (Terraform)

```
Region: us-east-1
├── VPC: 10.0.0.0/16
│   ├── Public Subnet: 10.0.1.0/24 (AZ-a)
│   │   ├── Internet Gateway
│   │   └── Route Table: 0.0.0.0/0 → IGW
│   │
│   ├── EC2: resume-showcase-k3s-master (t3.micro)
│   │   ├── AMI: Ubuntu 22.04 LTS (Jammy)
│   │   ├── Storage: 20GB gp3
│   │   ├── IAM Profile: SSM + SSM Parameter read access
│   │   └── UserData: user-data-master.sh
│   │       ├── Installs Docker, kubectl
│   │       ├── Runs install-k3s.sh
│   │       └── Configures kubeconfig
│   │
│   └── EC2: resume-showcase-jenkins-ci (t3.micro)
│       ├── AMI: Ubuntu 22.04 LTS (Jammy)
│       ├── Storage: 20GB gp3
│       ├── IAM Profile: SSM + SSM Parameter read access
│       └── UserData: user-data-ci.sh
│           ├── Installs Jenkins, Docker, Trivy
│           └── Configures Jenkins initial setup
│
├── Security Group: resume-showcase-k3s-sg
│   ├── Inbound: 22 (SSH) — 0.0.0.0/0
│   ├── Inbound: 80, 443 (HTTP/S) — 0.0.0.0/0
│   ├── Inbound: 8080 (Jenkins) — 0.0.0.0/0
│   ├── Inbound: 6443 (k3s API) — VPC CIDR only (10.0.0.0/16)
│   ├── Inbound: 9090 (Prometheus), 3000 (Grafana) — 0.0.0.0/0
│   ├── Inbound: 30080-30081, 30443 (NodePort) — 0.0.0.0/0
│   ├── Inbound: Self (all ports, internal VPC communication)
│   └── Outbound: all — 0.0.0.0/0
│
├── IAM Role: resume-showcase-ec2-ssm-role
│   ├── Trust: ec2.amazonaws.com
│   ├── Policy: AmazonSSMManagedInstanceCore (AWS managed)
│   └── Policy: resume-showcase-ssm-parameter-access
│       └── ssm:GetParameter on arn:aws:ssm:*:*:parameter/resume-showcase/*
│
└── SSM Parameter Store (SecureString, KMS encrypted)
    ├── /resume-showcase/dockerhub/username
    ├── /resume-showcase/dockerhub/password
    └── /resume-showcase/sonarcloud/token
```

### k3s Cluster Architecture

```
k3s Master Node (EC2 t3.micro, 1vCPU, 1GB RAM)
├── k3s control plane (API server, scheduler, controller-manager, etcd)
├── kubelet
│
├── Namespaces
│   ├── default
│   │   └── Deployment: resume-showcase
│   │       ├── Replicas: 1 (optimized for 1GB RAM)
│   │       ├── Image: rahulvaranasi/resume-showcase:<BUILD_NUM>
│   │       ├── Container: nginx:alpine (non-root, UID 101)
│   │       ├── Resources: request 64Mi/50m, limit 128Mi/200m
│   │       └── Health: liveness + readiness probes on /health
│   │
│   ├── kube-system
│   │   └── Deployment: traefik (Ingress Controller)
│   │       ├── Image: traefik:v2.10
│   │       ├── EntryPoint: :80 → NodePort 30080
│   │       └── Resources: request 64Mi/50m, limit 128Mi/200m
│   │
│   ├── monitoring
│   │   ├── Deployment: prometheus
│   │   │   ├── Image: prom/prometheus:v2.47.0
│   │   │   ├── Config: prometheus.yml (scrape: self, nodes, pods)
│   │   │   ├── Retention: 7 days
│   │   │   └── NodePort: 30090
│   │   │
│   │   └── Deployment: grafana
│   │       ├── Image: grafana/grafana:10.1.0
│   │       ├── Datasource: Prometheus
│   │       └── NodePort: 30030
│   │
│   └── argocd
│       ├── argocd-server (API + UI)
│       ├── argocd-application-controller
│       ├── argocd-repo-server
│       ├── argocd-redis
│       └── NodePort Service → 30081 (HTTP), 30443 (HTTPS)
│
└── Network: Flannel CNI (k3s default)
```

### Jenkins Pipeline Flow (Phase 1)

```
Developer Push to GitHub
        │
        ▼
GitHub Webhook → Jenkins EC2 :8080
        │
        ▼ stage: Checkout
Git clone + capture short SHA
        │
        ▼ stage: Build Docker Image
docker build -t rahulvaranasi/resume-showcase:<BUILD_NUM>
  --build-arg BUILD_DATE=<ISO8601>
  --build-arg VCS_REF=<SHA>
        │
        ▼ stage: Trivy Security Scan
trivy image --severity CRITICAL,HIGH --exit-code 1
  → Generates trivy-report.json
  → Archives as Jenkins artifact
  → Fails build on CRITICAL/HIGH found
        │
        ▼ stage: Push to DockerHub
docker login (from Jenkins Credentials)
docker push rahulvaranasi/resume-showcase:<BUILD_NUM>
docker push rahulvaranasi/resume-showcase:latest
        │
        ▼ stage: Update GitOps Manifest
sed -i updates gitops/deployment.yaml image tag
git commit + push (triggers ArgoCD)
        │
        ▼ ArgoCD sync (automated, every 3 min)
kubectl apply gitops/deployment.yaml
        │
        ▼ k3s RollingUpdate
Old pod terminates → New pod starts
        │
        ▼ Live at http://<EC2_IP>
```

---

## Phase 2 Architecture — GitHub Actions + Netlify

### GitHub Actions Pipeline

See [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) for the full implementation.

**Key architectural decisions:**

1. **Job separation** — Each stage is a separate job with explicit `needs:` dependencies. This enables:
   - Parallel execution (Docker + SonarCloud run simultaneously)
   - Clear failure attribution (know exactly which stage failed)
   - Artifact passing between jobs (build once, use everywhere)

2. **Concurrency groups** — Prevents race conditions:
   ```yaml
   concurrency:
     group: ${{ github.workflow }}-${{ github.ref }}
     cancel-in-progress: ${{ github.event_name == 'pull_request' }}
   ```
   - PRs: Cancel old run when new commit is pushed (saves minutes)
   - Main: Queue new run, never cancel a deploy mid-flight

3. **Artifact strategy** — Build artifact is uploaded once, downloaded by both Deploy and GitOps jobs. No double-building.

4. **Environment gates** — `production` environment means GitHub checks environment protection rules before deploying.

5. **SARIF integration** — Trivy results uploaded to GitHub Security tab via `github/codeql-action/upload-sarif`. This is what enterprise teams use.

### Netlify Configuration

```
netlify.toml
├── [build]
│   ├── command: npm run build
│   ├── publish: dist/public
│   └── NODE_VERSION: 20
│
├── [[redirects]]
│   └── /* → /index.html (200) — SPA routing
│
└── [[headers]]
    ├── /* → Security headers (CSP, X-Frame-Options, etc.)
    ├── /assets/* → Cache-Control: immutable, 1 year
    └── /*.html → Cache-Control: must-revalidate
```

---

## Docker Architecture

### Multi-Stage Dockerfile

```
Stage 1: builder (node:18-alpine)
├── WORKDIR /app
├── COPY package*.json → npm ci --ignore-scripts
├── COPY . .
└── RUN npm run build → /app/dist/public

Stage 2: runtime (nginx:alpine)
├── RUN: Install tini (PID 1 signal handler)
├── RUN: Set up nginx cache dirs + ownership for non-root
├── COPY --from=builder /app/dist/public → /usr/share/nginx/html
├── COPY: Embedded nginx.conf (via heredoc)
│   ├── gzip compression (level 6)
│   ├── Static file caching (1 year)
│   ├── /health endpoint (lightweight probe)
│   └── SPA try_files fallback
├── EXPOSE 80
├── ENTRYPOINT ["/sbin/tini", "--"]
└── CMD ["nginx", "-g", "daemon off;"]
```

**Security features in the image:**
- Final image is `nginx:alpine` (~7MB base, minimal attack surface)
- `tini` as PID 1 (proper signal handling, zombie reaping)
- nginx runs as `nginx` user (UID 101, non-root)
- Cache directories pre-created with correct ownership
- OCI labels via `docker/metadata-action`

---

## Security Architecture Detail

### Shift-Left Security Model

```
┌──── SHIFT-LEFT ──────────────────────────────────────────────────────────┐
│                                                                           │
│  Source Code          Container          Infrastructure        Runtime    │
│      │                    │                    │                  │       │
│   Gitleaks            Trivy CVE           Terraform          Security    │
│   SonarCloud          Scanning            IAM least          Groups      │
│   npm audit           Non-root            privilege          HTTPS       │
│                       read-only FS        SSM secrets        CSP         │
│                       tini PID1           KMS encrypt        Headers     │
│                                                                           │
│  ◄──────────── Catch issues earlier = cheaper to fix ─────────────────► │
└───────────────────────────────────────────────────────────────────────────┘
```

### CVE Handling Policy

| Severity | Policy |
|---|---|
| CRITICAL (fixed) | Block pipeline |
| CRITICAL (unfixed) | Log, create issue, don't block |
| HIGH (fixed) | Log, warn in summary |
| HIGH (unfixed) | Informational only |
| MEDIUM/LOW | Ignored in gate, visible in Security tab |

---

## Data Flow

```
Browser Request
      │
      ▼
Netlify Edge CDN (Phase 2) / EC2 EIP (Phase 1)
      │
      ▼ (Phase 1 only)
Traefik Ingress Controller (kube-system namespace)
      │
      ▼ (Phase 1 only)
nginx container (default namespace, port 80)
      │
      ▼
React SPA (static files served by nginx)
      │
      ▼
Client-side routing (React Router / wouter)
```

---

## Resource Optimization (Phase 1)

Both EC2 t3.micro instances (1vCPU, 1GB RAM) were carefully optimized:

| Optimization | Detail |
|---|---|
| Swap disabled | Prevents disk I/O performance degradation |
| Memory limits on all containers | Hard OOM boundaries via K8s resource limits |
| Log rotation | Prevents disk fill from container logs |
| Docker log size limited | `--log-opt max-size=10m --log-opt max-file=3` |
| k3s minimal components | Disabled: traefik (own version), servicelb, local-storage |
| Single replica | 1 pod per service to stay within 1GB RAM |
| Jenkins heap limit | `JAVA_OPTS=-Xmx512m -Xms256m` |
| Prometheus retention | 7 days (not unlimited) |
| k3s eviction thresholds | Evict pods at `memory.available<100Mi` |
