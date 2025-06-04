# Furniture HUB - Static Website Deployment

This project demonstrates how to containerize a static furniture store website and deploy it using Docker and Kubernetes.

## Project Structure
.
├── cart.js
├── Dockerfile
├── furniture-hub-deployment.yaml
├── furniture-hub-deployment-updated.yaml
├── img/
├── index.html
├── main.js
└── style.css


## Prerequisites

- Docker installed
- Kubernetes cluster (Minikube recommended for local development)
- kubectl configured

## Docker Setup

### Build the Docker Image

bash
docker build -t furniture-hub .
Run the Container Locally
bash
docker run -p 8080:8080 furniture-hub
The website will be available at: http://localhost:8080

Push to Docker Hub
Tag the image:

bash
docker tag furniture-hub dhavalpr0310/furniture-hub:latest
Push to Docker Hub:

bash
docker push dhavalpr0310/furniture-hub:latest
Kubernetes Deployment
Initial Deployment (2 replicas)
bash
kubectl apply -f furniture-hub-deployment.yaml
This creates:

Deployment with 2 replicas

NodePort service

Scaled Deployment (3 replicas with LoadBalancer)
bash
kubectl apply -f furniture-hub-deployment-updated.yaml
Accessing the Application
Start Minikube tunnel (if using Minikube):

bash
minikube tunnel &
Port-forward to host IP:

bash
kubectl port-forward --address 0.0.0.0 service/furniture-hub-service 8080:80 &
Access via:

Local machine: http://localhost:8080

Network devices: http://<your-host-ip>:8080

Kubernetes Management Commands
Check deployment status:

bash
kubectl get deployments
kubectl get pods
kubectl get services
Scale deployment:

bash
kubectl scale deployment furniture-hub --replicas=3
Technical Details
Docker Image: Node.js 18 Alpine with http-server

Port: 8080 (container) → 80 (service)

Resources:

Limits: 0.5 CPU, 512Mi Memory

Requests: 0.2 CPU, 256Mi Memory

Cleanup
Stop port-forwarding:

bash
pkill -f "port-forward"
Delete Kubernetes resources:

bash
kubectl delete -f furniture-hub-deployment-updated.yaml
Notes
The LoadBalancer service may show <pending> EXTERNAL-IP in Minikube - this is normal

Minikube tunnel needs to remain running for LoadBalancer to work

Image is publicly available at: dhavalpr0310/furniture-hub:latest


This README provides:
1. Clear project structure overview
2. Step-by-step Docker instructions
3. Comprehensive Kubernetes deployment guide
4. Management and cleanup commands
5. Technical specifications
6. Troubleshooting notes

The formatting uses proper markdown syntax for code blocks, lists, and headings to ensure good readability on GitHub or other platforms.
