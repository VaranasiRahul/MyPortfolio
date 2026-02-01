#!/bin/bash
set -e

echo "Optimizing system for low memory"
swapoff -a
sed -i '/ swap / s/^/#/' /etc/fstab

echo "vm.swappiness=10" >> /etc/sysctl.conf
echo "vm.vfs_cache_pressure=50" >> /etc/sysctl.conf
sysctl -p

apt-get update
apt-get install -y curl wget git

echo "Waiting for master node"
sleep 60

echo "CI node setup complete"
