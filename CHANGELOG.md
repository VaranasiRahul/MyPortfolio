# Changelog

All notable changes to this project are documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.0.0] — 2025-07 — GitHub Actions + Netlify Era

### Added
- **Enterprise GitHub Actions pipeline** (`.github/workflows/deploy.yml`)
  - 8-stage pipeline: security scan → code quality → build → docker+trivy → sonarcloud → deploy → gitops → summary
  - Gitleaks secret scanning on every push
  - Trivy SARIF upload to GitHub Security tab
  - Concurrency groups (cancel-in-progress on PRs, queue on main)
  - Artifact upload/download between jobs (build once, deploy anywhere)
  - `production` GitHub environment with deployment URL
  - Rich job summaries with tables and links
- **PR validation pipeline** (`.github/workflows/pr-check.yml`)
  - Automatic PR comment with check results
  - Bundle size reporting per PR
- **Netlify configuration** (`netlify.toml`)
  - SPA redirect rules (React Router support)
  - Security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy)
  - Immutable cache headers for Vite-hashed assets
- **SonarCloud configuration** (`sonar-project.properties`)
- **Architecture documentation** (`docs/ARCHITECTURE.md`)
- **Pipeline migration story** (`docs/PIPELINE-MIGRATION.md`)

### Changed
- **README** — Complete professional rewrite with architecture diagrams, pipeline breakdown, security layers, and full tool inventory
- **Jenkinsfile** — Added historical header comments explaining Phase 1 → Phase 2 migration
- **gitops/argocd-app.yaml** — Fixed GitHub repo URL casing (`VaranasiRahul/MyPortfolio`)

### Infrastructure
- **Hosting migrated**: AWS EC2 → Netlify CDN
- **CI/CD migrated**: Jenkins (self-hosted) → GitHub Actions (managed)
- **Cost**: ~$18/month (post-free-tier AWS) → $0/month (free tier: Netlify + GitHub Actions)

---

## [1.0.0] — 2024 — AWS + Jenkins + k3s Era

### Infrastructure (Terraform)
- AWS VPC (10.0.0.0/16) with public subnet, IGW, route tables
- 2x EC2 t3.micro instances (k3s master + Jenkins CI)
- AWS IAM Role with SSM Managed Instance Core (no static SSH key management)
- AWS SSM Parameter Store (SecureString) for DockerHub + SonarCloud credentials
- Security groups with minimal-port access policy

### Kubernetes (k3s)
- k3s cluster on EC2 t3.micro (1vCPU, 1GB RAM)
- Traefik v2.10 Ingress Controller (custom install, not k3s bundled)
- Resource limits on all containers (OOM protection)
- Non-root nginx container (UID 101) with capability dropping
- Liveness + readiness health probes on `/health`
- RollingUpdate strategy (maxUnavailable: 0, zero-downtime deploys)

### GitOps (ArgoCD)
- ArgoCD deployed in `argocd` namespace via official manifests
- Automated sync with prune + selfHeal enabled
- Retry policy with exponential backoff (5 attempts, max 3 min)
- Application definition in `gitops/argocd-app.yaml`

### CI/CD (Jenkins)
- Declarative Jenkins Pipeline (Jenkinsfile)
- GitHub webhook trigger
- Docker image build with BUILD_DATE + VCS_REF labels
- Trivy container scanning (CRITICAL/HIGH exit-code 1)
- SonarCloud SAST (commented out due to t3.micro memory limits)
- DockerHub push with versioned + latest tags
- GitOps manifest auto-update via sed + git commit

### Security
- Trivy container scanning in pipeline
- AWS SSM Parameter Store for secrets (never in code)
- IAM least-privilege (scoped to `/resume-showcase/*` only)
- Security groups with minimal ingress ports
- nginx non-root execution

### Monitoring
- Prometheus v2.47.0 in `monitoring` namespace
- Grafana v10.1.0 with Prometheus datasource
- Node, pod, and application metrics scraping
- 7-day metric retention
- NodePort services (30090, 30030)

### Application
- React 18 + Vite + TypeScript SPA
- TailwindCSS + Framer Motion
- Sections: Hero, Experience, Projects, Skills, Certifications, Education, Contact
- Multi-stage Dockerfile (node:18-alpine builder → nginx:alpine runtime)
- gzip compression, immutable cache headers for static assets
- `/health` endpoint for Kubernetes probes
