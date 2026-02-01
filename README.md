# Resume Showcase - DevSecOps Infrastructure

Complete DevSecOps setup for React SPA on AWS EC2 with k3s, Jenkins, and ArgoCD.

## Architecture

- **2x AWS EC2 t3.micro instances** (free tier)
- **k3s Kubernetes** on master node
- **Jenkins CI** on dedicated node
- **ArgoCD GitOps** deployment
- **Prometheus + Grafana** monitoring
- **Trivy** container security scanning
- **SonarCloud** SAST analysis
- **AWS SSM** Parameter Store for secrets
- **nginx** static file serving

## Prerequisites

- AWS account
- DockerHub account
- SonarCloud account
- GitHub repository
- SSH key pair
- Terraform >= 1.0
- AWS CLI configured

## Quick Start

### 1. Configure Terraform Variables

Create `terraform/terraform.tfvars`:

```hcl
aws_region         = "us-east-1"
project_name       = "resume-showcase"
ssh_public_key     = "ssh-rsa AAAA..."
k3s_token          = "your-secret-token"
dockerhub_username = "your-username"
dockerhub_password = "your-password"
sonarcloud_token   = "your-token"
```

### 2. Deploy Infrastructure

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### 3. Install k3s on Master

```bash
ssh ubuntu@<MASTER_IP>
export K3S_TOKEN="your-secret-token"
bash <(curl -s https://raw.githubusercontent.com/your-repo/main/scripts/install-k3s.sh)
```

### 4. Install Jenkins on CI Node

```bash
ssh ubuntu@<CI_IP>
bash <(curl -s https://raw.githubusercontent.com/your-repo/main/scripts/install-ci.sh)
```

### 5. Install Monitoring on Master

```bash
ssh ubuntu@<MASTER_IP>
bash <(curl -s https://raw.githubusercontent.com/your-repo/main/scripts/install-monitoring.sh)
```

### 6. Configure Jenkins

1. Access Jenkins: `http://<CI_IP>:8080`
2. Get initial password: `sudo cat /var/lib/jenkins/secrets/initialAdminPassword`
3. Install suggested plugins
4. Add credentials:
   - DockerHub credentials (ID: `dockerhub-credentials`)
   - SonarCloud token (ID: `sonarcloud-token`)
5. Create pipeline from SCM
6. Configure webhook in GitHub

### 7. Configure ArgoCD

1. Get ArgoCD password:
```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath='{.data.password}' | base64 -d
```

2. Access ArgoCD: `http://<MASTER_IP>:30081`
3. Login with username `admin`
4. Apply ArgoCD application:
```bash
kubectl apply -f gitops/argocd-app.yaml
```

## Jenkins Pipeline

Pipeline automatically:
1. Runs SonarCloud SAST scan
2. Builds Docker image
3. Scans image with Trivy
4. Pushes to DockerHub
5. Updates GitOps manifests
6. ArgoCD auto-deploys changes

## Access URLs

- **Application**: `http://<MASTER_IP>`
- **Jenkins**: `http://<CI_IP>:8080`
- **ArgoCD**: `http://<MASTER_IP>:30081`
- **Grafana**: `http://<MASTER_IP>:30030` (admin/admin)
- **Prometheus**: `http://<MASTER_IP>:30090`

## Resource Optimization

Both instances optimized for 1GB RAM:
- Swap disabled
- Memory limits on all containers
- Log rotation configured
- Docker log size limited
- k3s with minimal components
- Single replica deployments

## Security Features

- Container scanning with Trivy
- SAST with SonarCloud
- Secrets in AWS SSM Parameter Store
- Security groups with minimal ports
- Non-root containers
- Read-only root filesystems where possible
- IAM roles with least privilege

## Monitoring

Grafana dashboards for:
- k3s cluster metrics
- Application metrics
- Container resource usage
- Node health

## Cost Estimate

- 2x t3.micro: $0/month (free tier)
- 40GB EBS: $0/month (free tier)
- Data transfer: minimal
- SSM: free
- **Total: $0/month** (within free tier limits)

## Cleanup

```bash
cd terraform
terraform destroy
```

## Troubleshooting

### k3s not starting
```bash
sudo systemctl status k3s
sudo journalctl -u k3s -f
```

### Jenkins out of memory
```bash
sudo systemctl edit jenkins
# Add: Environment="JAVA_OPTS=-Xmx512m -Xms256m"
sudo systemctl restart jenkins
```

### ArgoCD sync issues
```bash
kubectl get pods -n argocd
kubectl logs -n argocd deployment/argocd-application-controller
```

## Customization

Update values in:
- `gitops/deployment.yaml` - resource limits, replicas
- `Jenkinsfile` - build steps, registries
- `terraform/variables.tf` - infrastructure settings
- `scripts/*.sh` - installation options

## Support

For issues, check:
1. EC2 instance system logs
2. k3s logs: `kubectl logs -n kube-system`
3. Jenkins console output
4. ArgoCD UI application status
