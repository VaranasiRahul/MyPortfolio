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
        
        stage('SonarCloud SAST') {
            steps {
                script {
                    sh """
                        npm ci
                        npx sonar-scanner \
                          -Dsonar.organization=${SONAR_ORG} \
                          -Dsonar.projectKey=${SONAR_PROJECT} \
                          -Dsonar.sources=client/src \
                          -Dsonar.host.url=https://sonarcloud.io \
                          -Dsonar.login=${SONAR_TOKEN}
                    """
                }
            }
        }
        
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
