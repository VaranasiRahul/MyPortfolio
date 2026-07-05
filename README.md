<div align="center">

# Rahul Varanasi — DevOps Portfolio

### A Production-Grade DevSecOps Project Showcasing End-to-End Infrastructure Automation

[![CI/CD Pipeline](https://github.com/VaranasiRahul/MyPortfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/VaranasiRahul/MyPortfolio/actions/workflows/deploy.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8e15adc9-ca75-4d19-8ca6-8bc527d23271/deploy-status)](https://rahulvaranasi-portfolio.netlify.app)
[![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=VaranasiRahul_MyPortfolio&metric=alert_status)](https://sonarcloud.io/project/overview?id=VaranasiRahul_MyPortfolio)
[![Docker Image](https://img.shields.io/docker/pulls/rahulvaranasi/resume-showcase?label=DockerHub%20Pulls)](https://hub.docker.com/r/rahulvaranasi/resume-showcase)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**🌐 Live Site:** [rahulvaranasi-portfolio.netlify.app](https://rahulvaranasi-portfolio.netlify.app)

</div>

---

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
  - [Phase 1 — AWS Infrastructure (Historical)](#phase-1--aws-infrastructure-historical)
  - [Phase 2 — GitHub Actions + Netlify (Current)](#phase-2--github-actions--netlify-current)
- [CI/CD Pipeline Deep Dive](#cicd-pipeline-deep-dive)
- [DevSecOps Stack](#devsecops-stack)
- [Repository Structure](#repository-structure)
- [Infrastructure as Code (Terraform)](#infrastructure-as-code-terraform)
- [Kubernetes & GitOps](#kubernetes--gitops)
- [Security Architecture](#security-architecture)
- [Monitoring & Observability](#monitoring--observability)
- [Pipeline Migration: Jenkins → GitHub Actions](#pipeline-migration-jenkins--github-actions)
- [How to Run Locally](#how-to-run-locally)
- [Secrets & Configuration](#secrets--configuration)

---

## Project Overview

This is my independent DevOps project — a fully containerized, GitOps-driven portfolio website backed by an enterprise-grade CI/CD pipeline. I built this to demonstrate **real-world DevOps engineering skills** beyond what I do at TCS for Jaguar Land Rover.

**What makes this project interesting to a DevOps engineer:**

| Area | Implementation |
|---|---|
| **IaC** | Terraform provisions a complete AWS VPC, 2x EC2, IAM roles, security groups, SSM Parameter Store |
| **Kubernetes** | k3s cluster on EC2 with Traefik ingress, resource limits, health probes, non-root containers |
| **GitOps** | ArgoCD watches this repo and auto-syncs `gitops/` manifests to k3s |
| **CI/CD (Legacy)** | Jenkins pipeline on dedicated EC2 (Jenkinsfile preserved) |
| **CI/CD (Current)** | Enterprise GitHub Actions: 8-stage pipeline with security gates |
| **Security** | Trivy container scanning + SonarCloud SAST + secret detection + CSP headers |
| **Monitoring** | Prometheus + Grafana on k3s |
| **Deploy** | Netlify (free tier) with SPA routing, cache headers, security headers |

---

## Architecture

### Phase 1 — AWS Infrastructure (Historical)

> ⚠️ AWS free tier has expired. Infrastructure preserved in `terraform/` and `scripts/` as a showcase of IaC and Kubernetes knowledge.

```
┌─────────────────────────────────────────────────────────────────┐
│                         AWS VPC (10.0.0.0/16)                   │
│  ┌──────────────────────┐    ┌──────────────────────────────┐   │
│  │  Jenkins CI Node     │    │  k3s Master Node              │   │
│  │  EC2 t3.micro        │    │  EC2 t3.micro                 │   │
│  │  ─────────────────   │    │  ────────────────────────     │   │
│  │  Jenkins :8080       │    │  k3s API :6443               │   │
│  │  Trivy               │    │  Traefik Ingress :80          │   │
│  │  SonarScanner        │    │  ArgoCD :30081               │   │
│  │  Docker daemon       │    │  Prometheus :30090            │   │
│  │                      │    │  Grafana :30030               │   │
│  │  IAM Role:           │    │  App (nginx) :30080           │   │
│  │  SSM Parameter Store │    │                               │   │
│  └──────────┬───────────┘    └──────────────┬───────────────┘   │
│             │                               │                    │
│             └──────── Security Group ───────┘                    │
│                       (VPC-internal traffic)                     │
└─────────────────────────────────────────────────────────────────┘
                    │                    │
              DockerHub             GitHub Repo
         (image registry)          (source + gitops)
```

**Terraform-provisioned resources:**
- Custom VPC with public subnet, Internet Gateway, route tables
- Security groups with minimal-port policy (SSH, HTTP, HTTPS, k3s API, Jenkins, monitoring)
- IAM Role + Instance Profile with SSM Managed Instance Core (no SSH key management needed)
- SSM Parameter Store entries (SecureString) for DockerHub + SonarCloud secrets
- EC2 UserData scripts for automated k3s and Jenkins bootstrapping

### Phase 2 — GitHub Actions + Netlify (Current)

```
┌─────────────────────────────────────────────────────────────────┐
│  Developer pushes to main                                        │
│          │                                                       │
│          ▼                                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              GitHub Actions Pipeline (8 stages)           │  │
│  │                                                           │  │
│  │  ① Secret Scan (gitleaks) → ② TypeScript + Quality       │  │
│  │          │                          │                     │  │
│  │          └──────────┬───────────────┘                     │  │
│  │                     ▼                                     │  │
│  │           ③ Vite Build (artifact)                         │  │
│  │               │               │                           │  │
│  │         ┌─────┘               └──────┐                    │  │
│  │         ▼                           ▼                     │  │
│  │  ④ Docker Build              ⑤ SonarCloud SAST            │  │
│  │     + Trivy Scan                (parallel)                │  │
│  │     → SARIF upload                                        │  │
│  │     → DockerHub push                                      │  │
│  │         │                           │                     │  │
│  │         └──────────┬────────────────┘                     │  │
│  │                    ▼                                       │  │
│  │         ⑥ Deploy to Netlify                               │  │
│  │                    │                                       │  │
│  │                    ▼                                       │  │
│  │         ⑦ Update GitOps Manifest                          │  │
│  │            (gitops/deployment.yaml)                        │  │
│  │                    │                                       │  │
│  │                    ▼                                       │  │
│  │         ⑧ Pipeline Summary                                │  │
│  └───────────────────────────────────────────────────────────┘  │
│          │                    │                                   │
│          ▼                    ▼                                   │
│    Netlify CDN           DockerHub                               │
│    (live site)          (image ready for                        │
│                          ArgoCD → k3s if re-deployed)           │
└─────────────────────────────────────────────────────────────────┘
```

---

## CI/CD Pipeline Deep Dive

The pipeline is defined in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Pipeline Features (Enterprise-Grade)

| Feature | Implementation |
|---|---|
| **Trigger control** | Push to `main`/`develop`, PRs, manual `workflow_dispatch` with inputs |
| **Concurrency** | Cancel-in-progress for PRs, queue for `main` (never cancel a deploy mid-flight) |
| **Least privilege** | Default `contents: read`, jobs declare only what they need |
| **Caching** | npm cache + Docker BuildKit layer cache (GitHub Actions Cache API) |
| **Artifact management** | Build artifact uploaded/downloaded between jobs (no re-building) |
| **Graceful degradation** | Docker/SonarCloud stages skip if secrets missing (guards with `if: env.SECRET != ''`) |
| **SARIF reports** | Trivy results uploaded to GitHub Security tab (Advanced Security) |
| **Environment protection** | `production` environment gate — all security jobs must pass |
| **GitOps loop** | Manifest updated with `[skip ci]` commit after successful deploy |
| **Job summaries** | Rich markdown summaries per stage + final aggregated report |

### Stage-by-Stage Breakdown

#### 🔒 Stage 1: Security Gate
```yaml
# Runs BEFORE build — catches issues early before wasting compute
- gitleaks: Scans all commits for hardcoded secrets/tokens
- npm audit: Checks dependencies for known CVEs (blocks on HIGH+)
```

#### 🔍 Stage 2: Code Quality
```yaml
# TypeScript strict mode check — catches type errors before runtime
- tsc --noEmit --strict
- Build config validation
```

#### 🏗️ Stage 3: Build
```yaml
# Single build, artifact shared downstream (no duplicate builds)
- npm ci --prefer-offline  # Reproducible, uses lockfile
- npm run build            # Vite production bundle
- Bundle size analysis uploaded to job summary
- Artifact uploaded with SHA-tagged name (7-day retention)
```

#### 🐳 Stage 4: Docker Build + Trivy Scan
```yaml
# Docker BuildKit with GitHub Actions cache
- docker/build-push-action@v6 (with cache-from/to: type=gha)
- docker/metadata-action: OCI standard labels + semantic tags
- Trivy SARIF scan → GitHub Security tab
- Trivy hard gate: exits on CRITICAL (unfixed excluded)
- Push to DockerHub only on main branch
```

#### 🔐 Stage 5: SonarCloud SAST (parallel with Stage 4)
```yaml
# Runs concurrently with Docker to save total pipeline time
- Full git history checkout (needed for blame/issue tracking)
- SonarCloud project: VaranasiRahul_MyPortfolio
- Results: sonarcloud.io/project/overview?id=VaranasiRahul_MyPortfolio
```

#### 🚀 Stage 6: Deploy to Netlify
```yaml
# Only on main branch, only after all gates pass
- Downloads build artifact (not re-building)
- netlify deploy --prod
- Deploys to: rahulvaranasi-portfolio.netlify.app
- Environment: production (GitHub environment with URL)
```

#### 📋 Stage 7: Update GitOps Manifest
```yaml
# Demonstrates full GitOps knowledge
# Even with AWS down, this shows the ArgoCD loop would work
- sed -i updates image tag in gitops/deployment.yaml
- git commit with [skip ci] (prevents infinite loop)
- ArgoCD would auto-sync to k3s if cluster is live
```

---

## DevSecOps Stack

### Full Technology Inventory

```
┌─ Source Control ────────────────────────────────────────────────┐
│  Git · GitHub · Conventional Commits                            │
├─ CI/CD (Current) ───────────────────────────────────────────────┤
│  GitHub Actions · Netlify CLI · docker/build-push-action        │
├─ CI/CD (Legacy / Historical) ───────────────────────────────────┤
│  Jenkins (Declarative Pipeline) · GitHub Webhooks               │
├─ Containers ────────────────────────────────────────────────────┤
│  Docker · Dockerfile (multi-stage) · DockerHub                  │
│  Docker BuildKit · docker/metadata-action (OCI labels)          │
├─ Kubernetes ────────────────────────────────────────────────────┤
│  k3s (lightweight K8s) · Traefik Ingress · kubectl              │
│  Deployments · Services · Ingress · Health Probes               │
│  Resource Limits · Security Contexts · Non-root containers      │
├─ GitOps ────────────────────────────────────────────────────────┤
│  ArgoCD · Automated sync · Self-heal · Prune                    │
├─ Infrastructure as Code ────────────────────────────────────────┤
│  Terraform (AWS provider ~5.0)                                  │
│  VPC · EC2 · IAM · Security Groups · SSM Parameter Store        │
├─ Security ──────────────────────────────────────────────────────┤
│  Trivy (container scanning) · SonarCloud (SAST)                 │
│  Gitleaks (secret detection) · npm audit (dependency CVEs)      │
│  AWS SSM Parameter Store · SARIF → GitHub Security tab          │
│  CSP headers · Security headers (Netlify)                       │
├─ Monitoring ────────────────────────────────────────────────────┤
│  Prometheus · Grafana · k3s cluster metrics                     │
├─ Cloud ─────────────────────────────────────────────────────────┤
│  AWS EC2 · AWS VPC · AWS IAM · AWS SSM · Netlify CDN            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Repository Structure

```
MyPortfolio/
│
├── .github/
│   └── workflows/
│       ├── deploy.yml          # ★ Enterprise CI/CD pipeline (8 stages)
│       └── pr-check.yml        # Lightweight PR validation
│
├── client/                     # React + Vite + TypeScript SPA
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── pages/              # Route pages
│   │   └── lib/
│   │       └── static-data.ts  # Portfolio data (skills, experience, projects)
│   └── index.html
│
├── gitops/                     # ArgoCD GitOps manifests
│   ├── argocd-app.yaml         # ArgoCD Application definition
│   ├── deployment.yaml         # K8s Deployment (image tag updated by CI)
│   ├── service.yaml            # K8s Service (NodePort)
│   └── ingress.yaml            # Traefik Ingress rule
│
├── terraform/                  # AWS Infrastructure as Code
│   ├── main.tf                 # VPC, EC2, IAM, SSM resources
│   ├── variables.tf            # Input variables
│   ├── outputs.tf              # EC2 IPs, ARNs
│   ├── user-data-master.sh     # k3s master bootstrap script
│   └── user-data-ci.sh         # Jenkins CI node bootstrap script
│
├── scripts/                    # Server setup scripts
│   ├── install-k3s.sh          # k3s + Traefik ingress setup
│   ├── install-ci.sh           # Jenkins + Docker + Trivy setup
│   └── install-monitoring.sh   # Prometheus + Grafana + ArgoCD
│
├── docs/
│   ├── ARCHITECTURE.md         # Detailed architecture documentation
│   └── PIPELINE-MIGRATION.md   # Jenkins → GitHub Actions story
│
├── Dockerfile                  # Multi-stage: Node builder + nginx:alpine
├── Jenkinsfile                 # ⚠️ HISTORICAL — Phase 1 CI pipeline
├── netlify.toml                # Netlify config (SPA redirects, headers)
├── sonar-project.properties    # SonarCloud project config
├── CHANGELOG.md                # Project milestone tracker
└── README.md                   # This file
```

---

## Infrastructure as Code (Terraform)

The [`terraform/`](terraform/) directory provisions the complete AWS infrastructure declaratively.

### Resources Provisioned

```hcl
# VPC & Networking
aws_vpc.main                    # 10.0.0.0/16 with DNS enabled
aws_subnet.public               # Public subnet with auto-IP
aws_internet_gateway.main       # Internet access
aws_route_table.public          # Default route to IGW

# Security
aws_security_group.k3s          # Inbound: 22, 80, 443, 8080 (Jenkins),
                                #          9090 (Prometheus), 3000 (Grafana),
                                #          8081/30081 (ArgoCD), 6443 (k3s API)
                                # Egress: all

# IAM (least privilege)
aws_iam_role.ec2_ssm_role       # Allows EC2 to assume SSM role
aws_iam_role_policy.ssm_parameter_access  # ssm:GetParameter on /project/*
aws_iam_instance_profile.ec2_profile      # Attached to both EC2s

# Compute
aws_instance.k3s_master         # t3.micro, 20GB gp3, UserData → k3s setup
aws_instance.jenkins_ci         # t3.micro, 20GB gp3, UserData → Jenkins setup

# Secrets (encrypted at rest)
aws_ssm_parameter.dockerhub_username   # SecureString
aws_ssm_parameter.dockerhub_password   # SecureString
aws_ssm_parameter.sonarcloud_token     # SecureString
```

### Applying (if re-deploying)

```bash
cd terraform

# 1. Create tfvars (never committed)
cat > terraform.tfvars << EOF
aws_region         = "us-east-1"
project_name       = "resume-showcase"
ssh_public_key     = "$(cat ~/.ssh/id_rsa.pub)"
k3s_token          = "$(openssl rand -hex 32)"
dockerhub_username = "rahulvaranasi"
dockerhub_password = "YOUR_TOKEN"
sonarcloud_token   = "YOUR_TOKEN"
EOF

# 2. Deploy
terraform init
terraform plan -out=tfplan
terraform apply tfplan

# 3. Get IPs
terraform output k3s_master_ip
terraform output jenkins_ci_ip

# 4. Clean up
terraform destroy
```

---

## Kubernetes & GitOps

### k3s Cluster Setup

k3s is a lightweight, production-ready Kubernetes distribution from Rancher. It runs the full K8s API surface in a single binary — perfect for resource-constrained EC2 t3.micro instances.

**Key configurations in [`scripts/install-k3s.sh`](scripts/install-k3s.sh):**
```bash
--disable traefik          # Install our own version (pinned)
--disable servicelb        # Not needed on EC2
--kubelet-arg="eviction-hard=memory.available<100Mi"  # OOM protection
--kubelet-arg="kube-reserved=cpu=100m,memory=128Mi"   # System reservation
```

### Kubernetes Manifests

**[`gitops/deployment.yaml`](gitops/deployment.yaml)** — highlights:
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0          # Zero-downtime deploys

securityContext:
  runAsNonRoot: true
  runAsUser: 101               # nginx user
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: false
  capabilities:
    drop: [ALL]
    add: [NET_BIND_SERVICE]    # Only capability needed

resources:
  requests:
    memory: "64Mi"
    cpu: "50m"
  limits:
    memory: "128Mi"            # Hard OOM limit
    cpu: "200m"
```

### ArgoCD GitOps Flow

```
GitHub Push (gitops/deployment.yaml updated)
          │
          ▼
  ArgoCD polling (every 3 min) detects diff
          │
          ▼
  ArgoCD applies changes to k3s namespace
          │
          ▼
  k3s performs RollingUpdate (0 downtime)
          │
          ▼
  Old pod terminates after new pod is Ready
```

**ArgoCD configuration** ([`gitops/argocd-app.yaml`](gitops/argocd-app.yaml)):
```yaml
syncPolicy:
  automated:
    prune: true       # Remove resources deleted from Git
    selfHeal: true    # Revert manual kubectl changes
    allowEmpty: false # Never delete everything accidentally
  retry:
    limit: 5
    backoff:
      duration: 5s
      factor: 2
      maxDuration: 3m
```

---

## Security Architecture

Security is layered across every stage of the pipeline and infrastructure.

### Layer 1 — Source Code
| Control | Tool | What It Does |
|---|---|---|
| Secret scanning | `gitleaks` | Scans all commits for leaked tokens, passwords, keys |
| SAST | SonarCloud | Static code analysis for vulnerabilities, bugs, smells |
| Dependency audit | `npm audit` | Checks all npm packages against CVE database |

### Layer 2 — Container
| Control | Tool | What It Does |
|---|---|---|
| Image scanning | Trivy | Scans OS packages + language deps for CVEs |
| SARIF upload | GitHub Advanced Security | Centralizes findings in Security tab |
| Non-root execution | Dockerfile + K8s securityContext | Container runs as nginx user (UID 101) |
| Read-only FS | Dockerfile | Immutable container filesystem |
| Minimal image | `nginx:alpine` | Smaller attack surface vs full OS |
| Capability drop | K8s manifest | All capabilities dropped except `NET_BIND_SERVICE` |

### Layer 3 — Infrastructure
| Control | Service | What It Does |
|---|---|---|
| Secrets storage | AWS SSM Parameter Store | SecureString encrypted with KMS |
| Network isolation | AWS Security Groups | Least-port-access principle |
| IAM | EC2 Instance Profile | Scoped to `/project/*` SSM path only |
| No SSH keys in code | AWS Key Pair | SSH key pair provisioned, never hardcoded |

### Layer 4 — Web Application
| Control | Implementation | What It Does |
|---|---|---|
| CSP | netlify.toml headers | Prevents XSS, injection attacks |
| X-Frame-Options | netlify.toml | Prevents clickjacking |
| X-Content-Type-Options | netlify.toml | Prevents MIME sniffing |
| Referrer-Policy | netlify.toml | Controls referrer leakage |
| Permissions-Policy | netlify.toml | Disables camera, mic, geolocation |
| HTTPS | Netlify auto-TLS | Let's Encrypt certificate, auto-renewed |

---

## Monitoring & Observability

Prometheus and Grafana are deployed as Kubernetes Deployments in the `monitoring` namespace on the k3s cluster.

**Setup:** [`scripts/install-monitoring.sh`](scripts/install-monitoring.sh)

```
Prometheus (port 30090)
  ├── job: prometheus          → Prometheus self-monitoring
  ├── job: kubernetes-nodes    → Node CPU, memory, disk metrics
  └── job: kubernetes-pods     → Per-pod metrics (scrape_interval: 30s)

Grafana (port 30030)
  ├── Datasource: Prometheus
  ├── Dashboard: k3s cluster overview
  ├── Dashboard: Application pod resources
  └── Dashboard: Node health
```

**Storage:** `emptyDir` (ephemeral, suitable for demo/personal use — in production, use PersistentVolumes).

**Metrics retention:** 7 days (`--storage.tsdb.retention.time=7d`)

---

## Pipeline Migration: Jenkins → GitHub Actions

See [`docs/PIPELINE-MIGRATION.md`](docs/PIPELINE-MIGRATION.md) for the full migration story.

**Quick comparison:**

| Aspect | Jenkins (Phase 1) | GitHub Actions (Phase 2) |
|---|---|---|
| Hosting | Self-hosted EC2 t3.micro | GitHub-hosted runners (Ubuntu) |
| Cost | ~$0 (free tier, now expired) | Free (public repo, 2000 min/month) |
| Trigger | GitHub Webhook → Jenkins | Native GitHub event |
| Security reports | Archived JSON artifacts | SARIF → GitHub Security tab |
| Secrets | Jenkins Credentials Store | GitHub Secrets (encrypted) |
| Cache | Docker layer cache on disk | GitHub Actions Cache API |
| Multi-arch | Manual | docker/build-push-action (Buildx) |
| OCI labels | Manual `--label` flags | docker/metadata-action |
| PR feedback | No native PR comments | `actions/github-script` comments |
| Concurrency | Manual locks | Native `concurrency` groups |

**The Jenkinsfile is preserved** as `Jenkinsfile` — it's a historical artifact showing the original pipeline design and the evolution of the project.

---

## How to Run Locally

### Prerequisites
- Node.js 20+
- npm 9+
- (Optional) Docker, Terraform, kubectl

### Development Server
```bash
# Clone
git clone https://github.com/VaranasiRahul/MyPortfolio.git
cd MyPortfolio

# Install
npm install

# Start dev server (hot reload)
npm run dev
# → http://localhost:5173
```

### Production Build
```bash
npm run build
# → dist/public/

# Preview production build
npm run preview
```

### Docker Build + Run
```bash
# Build
docker build -t rahulvaranasi/resume-showcase:local .

# Run
docker run -p 8080:80 rahulvaranasi/resume-showcase:local
# → http://localhost:8080

# Security scan (requires Trivy installed)
trivy image --severity CRITICAL,HIGH rahulvaranasi/resume-showcase:local
```

### Netlify Local Development
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start with Netlify environment
netlify dev
```

---

## Secrets & Configuration

### GitHub Repository Secrets (Actions)

| Secret Name | Purpose | Status |
|---|---|---|
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token | ✅ Configured |
| `NETLIFY_SITE_ID` | Netlify site ID | ✅ Configured |
| `DOCKERHUB_USERNAME` | DockerHub username | ⚙️ Add for Docker push |
| `DOCKERHUB_TOKEN` | DockerHub access token | ⚙️ Add for Docker push |
| `SONAR_TOKEN` | SonarCloud analysis token | ⚙️ Add for SAST |

> Stages that require unconfigured secrets are **skipped gracefully** — the Netlify deploy always runs if the build passes.

### Netlify Configuration

| Setting | Value |
|---|---|
| Site Name | `rahulvaranasi-portfolio` |
| Live URL | `https://rahulvaranasi-portfolio.netlify.app` |
| Admin | `https://app.netlify.com/projects/RahulVaranasi-Portfolio` |
| Site ID | `8e15adc9-ca75-4d19-8ca6-8bc527d23271` |
| Build Command | `npm run build` |
| Publish Dir | `dist/public` |

### SonarCloud Configuration

| Setting | Value |
|---|---|
| Organization | `rahulvaranasi` |
| Project Key | `VaranasiRahul_MyPortfolio` |
| Dashboard | [sonarcloud.io](https://sonarcloud.io/project/overview?id=VaranasiRahul_MyPortfolio) |

---

<div align="center">

**Built with ❤️ by [Rahul Varanasi](https://rahulvaranasi-portfolio.netlify.app)**

*DevOps Engineer · AWS Certified · 2 Years Experience · Currently @ TCS (Jaguar Land Rover)*

[![GitHub](https://img.shields.io/badge/GitHub-VaranasiRahul-181717?logo=github)](https://github.com/VaranasiRahul)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rahul%20Varanasi-0A66C2?logo=linkedin)](https://linkedin.com/in/RahulVaranasi)

</div>
