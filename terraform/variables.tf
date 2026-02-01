variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "resume-showcase"
}

variable "ssh_public_key" {
  description = "SSH public key for EC2 access"
  type        = string
}

variable "k3s_token" {
  description = "Token for k3s cluster"
  type        = string
  sensitive   = true
}

variable "dockerhub_username" {
  description = "DockerHub username"
  type        = string
  sensitive   = true
}

variable "dockerhub_password" {
  description = "DockerHub password"
  type        = string
  sensitive   = true
}

variable "sonarcloud_token" {
  description = "SonarCloud authentication token"
  type        = string
  sensitive   = true
}
