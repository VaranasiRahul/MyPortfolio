# Pipeline Migration: Jenkins → GitHub Actions

## Why I Migrated

This document tells the story of how and why I migrated the CI/CD pipeline for this project from **Jenkins on AWS EC2** to **GitHub Actions**.

---

## The Original Setup (Phase 1)

When I first built this project, the goal was to demonstrate a complete, self-hosted DevOps stack — the kind you'd find in a mid-sized company that runs its own infrastructure. I chose Jenkins because:

1. **Industry prevalence** — Jenkins is still widely used in enterprises, especially in banking, healthcare, and manufacturing sectors
2. **Learning value** — Running Jenkins yourself teaches you things you don't learn from managed CI services: plugin management, credential stores, webhook configuration, disk space management, OOM tuning
3. **Full control** — You own every part of the pipeline, which is great for customization

The setup involved:
- Terraform provisioning a dedicated `t3.micro` EC2 instance for Jenkins
- Docker installed on the Jenkins node for building images
- Trivy installed system-wide for security scanning
- GitHub webhook configured to trigger Jenkins on push
- Jenkins Credentials Store for DockerHub + SonarCloud tokens
- Jenkins polling k3s master's kubeconfig to update GitOps manifests

**It worked perfectly.** The pipeline ran successfully, images were scanned, GitOps manifests were updated, and ArgoCD deployed changes to k3s automatically.

---

## Why I Migrated (Phase 2)

### Primary Reason: AWS Free Tier Expiry

The AWS Free Tier runs for 12 months. After that, 2x t3.micro instances in `us-east-1` cost approximately $16-18/month — not a huge amount, but for a personal portfolio project with zero revenue, it's not justifiable.

### Secondary Reasons: GitHub Actions is Simply Better for This Use Case

| Factor | Jenkins (self-hosted) | GitHub Actions (managed) |
|---|---|---|
| **Infrastructure cost** | ~$18/month (EC2) | $0 (free for public repos) |
| **Maintenance** | Update Jenkins, plugins, JVM, Docker | Zero maintenance |
| **Reliability** | Subject to EC2 instance health | GitHub SLA |
| **Integration** | Webhook setup, token management | Native GitHub events |
| **Security reports** | JSON artifacts in Jenkins | SARIF → GitHub Security tab |
| **Caching** | Docker layer cache on EC2 disk | GitHub Actions Cache API (10GB) |
| **Multi-arch builds** | Complex cross-compilation setup | docker/buildx natively |
| **PR comments** | Third-party plugins required | `actions/github-script` |
| **Audit trail** | Jenkins log files | GitHub UI (permanent, searchable) |
| **Community** | Plugin ecosystem (some outdated) | Marketplace (40,000+ actions) |

### Industry Trend

The DevOps industry has clearly moved toward **platform-native CI/CD**:
- GitHub Actions for GitHub-hosted repos
- GitLab CI/CD for GitLab-hosted repos
- Azure DevOps Pipelines for Azure repos

A 2024 Stack Overflow Developer Survey showed GitHub Actions as the **#1 CI/CD tool** used by developers, overtaking Jenkins for the first time. Enterprise adoption of GitHub Actions is accelerating, especially for greenfield projects.

---

## What Changed

### The Pipeline Flow

**Before (Jenkins):**
```
GitHub Push
  → GitHub Webhook HTTP POST → Jenkins EC2 :8080
  → Jenkinsfile execution
  → docker build (local daemon)
  → trivy image (local binary)
  → docker push
  → git push (update manifest)
  → ArgoCD sync
```

**After (GitHub Actions):**
```
GitHub Push
  → GitHub Events API (native trigger)
  → Runner provisioned (ubuntu-latest)
  → 8 parallel/sequential jobs
  → docker/build-push-action (Buildx)
  → aquasecurity/trivy-action (SARIF)
  → netlify/actions/cli (deploy)
  → git push (update manifest)
  → [ArgoCD sync if k3s deployed]
```

### What I Added in Phase 2

These features were not in the Jenkins pipeline and demonstrate more advanced CI/CD knowledge:

1. **Job parallelism** — Docker build and SonarCloud SAST run concurrently (saved ~5 minutes)
2. **Concurrency groups** — Prevents duplicate deploys on rapid pushes
3. **SARIF integration** — Trivy findings visible in GitHub Security tab
4. **OCI image labels** — `docker/metadata-action` generates proper `org.opencontainers.image.*` labels
5. **Bundle size reporting** — Vite bundle analysis in job summary
6. **PR comments** — Automatic PR validation feedback via `github-script`
7. **Artifact management** — Build once, download in parallel jobs (no redundant builds)
8. **Environment protection** — `production` environment gate
9. **Graceful secret degradation** — Pipeline works even without Docker/SonarCloud secrets

### What Stayed the Same

These are the core DevOps practices that don't change with the tooling:

- **Docker image build process** — Same Dockerfile, same multi-stage build
- **Trivy security scanning** — Same severity thresholds (CRITICAL, HIGH)
- **SonarCloud SAST** — Same project key (`VaranasiRahul_MyPortfolio`), same org
- **GitOps pattern** — Still updating `gitops/deployment.yaml` with new image tags
- **DockerHub registry** — Still pushing to `rahulvaranasi/resume-showcase`
- **nginx serving** — Same nginx configuration, same health endpoint
- **ArgoCD manifests** — Same deployment.yaml, service.yaml, ingress.yaml

---

## The Jenkinsfile Lives On

The `Jenkinsfile` has been preserved in the repository with a detailed header comment explaining its historical significance. This is intentional:

1. **Shows evolution** — Demonstrates I can work with both Jenkins and GitHub Actions
2. **Shows reasoning** — The comments explain *why* the migration happened
3. **Shows equivalence** — A reviewer can compare `Jenkinsfile` and `deploy.yml` and see the same logical steps
4. **Demonstrates enterprise knowledge** — Many companies still run Jenkins; this shows I know it

If a future employer uses Jenkins, they can see I've built a real Declarative Pipeline. If they use GitHub Actions, they can see the current pipeline is more sophisticated.

---

## Lessons Learned

### Jenkins
- **Memory management is critical** on small instances — Jenkins + JVM can easily OOM a t3.micro
- **Plugin updates** can break pipelines — pin plugin versions in production
- **Credential rotation** is painful — Jenkins UI doesn't support automated rotation
- **Monitoring Jenkins itself** is an additional concern — you need to watch the watcher
- **Cold starts** — Jenkins warmup takes 30-60 seconds after EC2 restart

### GitHub Actions
- **Concurrency control** is essential — without it, simultaneous pushes cause race conditions
- **Cache invalidation** — npm cache key must include `package-lock.json` hash
- **GITHUB_TOKEN permissions** — default is read-only; explicitly declare `contents: write` for commits
- **`[skip ci]` convention** — prevents infinite loops when pipeline commits back to repo
- **Artifact naming** — including SHA in artifact name prevents collisions in concurrent runs

---

## Cost Comparison

| Period | Setup | Monthly Cost |
|---|---|---|
| Month 1-12 | AWS EC2 (free tier) + Jenkins | $0.00 |
| Month 13+ | AWS EC2 (paid) + Jenkins | ~$18.00 |
| Current | GitHub Actions + Netlify | $0.00 |

Total savings by migrating: ~$18/month × ongoing = significant for a personal project.

---

## Conclusion

The migration from Jenkins to GitHub Actions was the **right technical decision** for this specific context. Both tools have their place:

- **Jenkins** excels in: large enterprises, air-gapped environments, complex plugin integrations, organizations with existing Jenkins expertise
- **GitHub Actions** excels in: GitHub-hosted projects, open-source, rapid iteration, zero-maintenance CI/CD, native security integrations

The ability to make this kind of architectural decision — understanding the trade-offs and choosing the right tool for the context — is a core DevOps engineering skill. This migration demonstrates that skill.
