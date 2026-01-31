# Local Setup and DevOps Guide (Static Site Mode)

## 1. Running Locally in VS Code

### Prerequisites
- [Node.js](https://nodejs.org/) (v20 or higher recommended)

### Steps
1. **Extract and Open:** Extract the downloaded ZIP file and open the folder in VS Code.
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Start Application:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5000`.

---

## 2. CI/CD Pipeline (GitHub -> Jenkins -> Docker -> ArgoCD -> K3s)

### A. Jenkins Pipeline (Jenkinsfile)
Create a `Jenkinsfile` in your root directory to automate the build and push:

```groovy
pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'your-dockerhub-username'
        APP_NAME = 'rahul-portfolio'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_HUB_USER}/${APP_NAME}:${BUILD_NUMBER} ."
                sh "docker tag ${DOCKER_HUB_USER}/${APP_NAME}:${BUILD_NUMBER} ${DOCKER_HUB_USER}/${APP_NAME}:latest"
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', passwordVariable: 'DOCKER_HUB_PWD', usernameVariable: 'DOCKER_HUB_USER')]) {
                    sh "echo ${DOCKER_HUB_PWD} | docker login -u ${DOCKER_HUB_USER} --password-stdin"
                    sh "docker push ${DOCKER_HUB_USER}/${APP_NAME}:${BUILD_NUMBER}"
                    sh "docker push ${DOCKER_HUB_USER}/${APP_NAME}:latest"
                }
            }
        }
        stage('Update Git Manifests') {
            steps {
                // Automation to update image tag in your K8s manifest repo
                sh "sed -i 's|image: .*|image: ${DOCKER_HUB_USER}/${APP_NAME}:${BUILD_NUMBER}|' k8s/deployment.yaml"
                // Git commit and push back to repo
            }
        }
    }
}
```

### B. Dockerfile (Nginx Static Serving)
Since the app is now static, we can serve it with a lightweight Nginx container:

```dockerfile
# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage (Nginx)
FROM nginx:alpine
COPY --from=builder /app/dist/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### C. GitOps with ArgoCD
1. **Connect Repository:** Add your GitHub repo to ArgoCD.
2. **Create Application:**
   - **Path:** Points to your `k8s/` folder.
   - **Cluster:** Points to your **K3s** cluster URL.
3. **Sync:** ArgoCD will detect the image tag change pushed by Jenkins and automatically deploy the new version to K3s.

### D. Kubernetes (K3s) Manifests
In a `k8s/` directory, create `deployment.yaml` and `service.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: portfolio
  template:
    metadata:
      labels:
        app: portfolio
    spec:
      containers:
      - name: portfolio
        image: your-dockerhub-username/rahul-portfolio:latest
        ports:
        - containerPort: 80
```
