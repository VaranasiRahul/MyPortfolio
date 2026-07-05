// =============================================================================
// ⚠️  HISTORICAL ARTIFACT — Jenkins CI Pipeline (Phase 1)
// =============================================================================
//
// This Jenkinsfile was the original CI/CD pipeline for this project during the
// AWS deployment phase (Phase 1). It ran on a dedicated Jenkins EC2 instance
// (t3.micro) provisioned via Terraform alongside a k3s Kubernetes master node.
//
// INFRASTRUCTURE (Phase 1 — AWS Free Tier):
//   • Jenkins CI Node  : AWS EC2 t3.micro (jenkins_ci)
//   • k3s Master Node  : AWS EC2 t3.micro (k3s_master)
//   • Orchestration    : Terraform (see terraform/)
//   • GitOps           : ArgoCD (see gitops/)
//
// PIPELINE FLOW (Phase 1):
//   GitHub Push → Jenkins Webhook → Build Docker Image → Trivy Scan
//       → Push to DockerHub → Update gitops/deployment.yaml
//       → ArgoCD auto-sync → k3s Kubernetes cluster
//
// WHY WE MIGRATED TO GITHUB ACTIONS (Phase 2):
//   • AWS free tier expired → cloud costs for personal project not justified
//   • GitHub Actions is free for public repositories (2,000 min/month)
//   • Native GitHub integration → no webhook setup, no EC2 maintenance
//   • Better ecosystem: OIDC, SARIF uploads, environment protection rules
//   • GitHub Actions has become the industry standard for open-source CI/CD
//   • Eliminates the operational burden of self-hosting a Jenkins instance
//
// WHAT STAYED THE SAME:
//   • Docker build process (same Dockerfile, same stages)
//   • Trivy security scanning (CRITICAL/HIGH severity gates)
//   • SonarCloud SAST (same project key: VaranasiRahul_MyPortfolio)
//   • GitOps manifest update (gitops/deployment.yaml)
//   • DockerHub registry (rahulvaranasi/resume-showcase)
//
// See .github/workflows/deploy.yml for the current GitHub Actions pipeline.
// See docs/PIPELINE-MIGRATION.md for the full migration story.
// =============================================================================

pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKERHUB_REPO = 'rahulvaranasi/resume-showcase'
        SONAR_TOKEN = credentials('sonarcloud-token')
        SONAR_ORG = 'rahulvaranasi'
        SONAR_PROJECT = 'VaranasiRahul_MyPortfolio'
        IMAGE_TAG = "${BUILD_NUMBER}"
        TRIVY_SEVERITY = 'CRITICAL,HIGH'
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git rev-parse --short HEAD > .git/commit-id'
                script {
                    env.GIT_COMMIT_SHORT = readFile('.git/commit-id').trim()
                }
            }
        }
        
        // SonarCloud SAST - Disabled due to memory constraints on t3.small
        // Re-enable when upgraded to larger instance or use SonarCloud automatic analysis
        // stage('SonarCloud SAST') {
        //     steps {
        //         script {
        //             sh """
        //                 npm ci
        //                 npx sonar-scanner \
        //                   -Dsonar.organization=${SONAR_ORG} \
        //                   -Dsonar.projectKey=${SONAR_PROJECT} \
        //                   -Dsonar.sources=client/src \
        //                   -Dsonar.host.url=https://sonarcloud.io \
        //                   -Dsonar.login=${SONAR_TOKEN}
        //             """
        //         }
        //     }
        // }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        docker build -t ${DOCKERHUB_REPO}:${IMAGE_TAG} \
                                     -t ${DOCKERHUB_REPO}:latest \
                                     --build-arg BUILD_DATE=\$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
                                     --build-arg VCS_REF=${GIT_COMMIT_SHORT} \
                                     .
                    """
                }
            }
        }
        
        stage('Trivy Security Scan') {
            steps {
                script {
                    sh """
                        trivy image \
                          --severity ${TRIVY_SEVERITY} \
                          --exit-code 0 \
                          --no-progress \
                          --format json \
                          --output trivy-report.json \
                          ${DOCKERHUB_REPO}:${IMAGE_TAG}
                        
                        trivy image \
                          --severity ${TRIVY_SEVERITY} \
                          --exit-code 1 \
                          --no-progress \
                          ${DOCKERHUB_REPO}:${IMAGE_TAG}
                    """
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'trivy-report.json', allowEmptyArchive: true
                }
            }
        }
        
        stage('Push to DockerHub') {
            steps {
                script {
                    sh """
                        echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin
                        docker push ${DOCKERHUB_REPO}:${IMAGE_TAG}
                        docker push ${DOCKERHUB_REPO}:latest
                        docker logout
                    """
                }
            }
        }
        
        stage('Update GitOps Manifest') {
            steps {
                script {
                    sh """
                        sed -i 's|image: ${DOCKERHUB_REPO}:.*|image: ${DOCKERHUB_REPO}:${IMAGE_TAG}|' gitops/deployment.yaml
                        git config user.email "jenkins@ci.local"
                        git config user.name "Jenkins CI"
                        git add gitops/deployment.yaml
                        git commit -m "Update image to ${IMAGE_TAG}" || true
                        git push origin main || true
                    """
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker system prune -f --volumes || true'
            cleanWs()
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}
