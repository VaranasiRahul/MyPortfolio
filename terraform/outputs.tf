output "k3s_master_public_ip" {
  description = "Public IP of k3s master node"
  value       = aws_instance.k3s_master.public_ip
}

output "k3s_master_private_ip" {
  description = "Private IP of k3s master node"
  value       = aws_instance.k3s_master.private_ip
}

output "jenkins_ci_public_ip" {
  description = "Public IP of Jenkins CI instance"
  value       = aws_instance.jenkins_ci.public_ip
}

output "jenkins_ci_private_ip" {
  description = "Private IP of Jenkins CI instance"
  value       = aws_instance.jenkins_ci.private_ip
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "ssh_command_master" {
  description = "SSH command for k3s master"
  value       = "ssh -i your-key.pem ubuntu@${aws_instance.k3s_master.public_ip}"
}

output "ssh_command_ci" {
  description = "SSH command for Jenkins CI"
  value       = "ssh -i your-key.pem ubuntu@${aws_instance.jenkins_ci.public_ip}"
}

output "jenkins_url" {
  description = "Jenkins URL"
  value       = "http://${aws_instance.jenkins_ci.public_ip}:8080"
}

output "argocd_url" {
  description = "ArgoCD URL"
  value       = "http://${aws_instance.k3s_master.public_ip}:8081"
}

output "grafana_url" {
  description = "Grafana URL"
  value       = "http://${aws_instance.k3s_master.public_ip}:3000"
}

output "prometheus_url" {
  description = "Prometheus URL"
  value       = "http://${aws_instance.k3s_master.public_ip}:9090"
}
