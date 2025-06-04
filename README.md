# 🪑 Furniture HUB - Static Website Deployment

This project demonstrates how to **containerize** a static furniture store website and deploy it using **Docker** and **Kubernetes (Minikube)**.

---

## 📁 Project Structure

```
.
├── cart.js
├── Dockerfile
├── furniture-hub-deployment.yaml
├── furniture-hub-deployment-updated.yaml
├── img/
├── index.html
├── main.js
└── style.css
```

---

## ✅ Prerequisites

- Docker installed
- Kubernetes cluster (Minikube recommended for local development)
- `kubectl` configured

---

## 🐳 Docker Setup

### 🔨 Build the Docker Image

```bash
docker build -t furniture-hub .
```

### 🚀 Run the Container Locally

```bash
docker run -p 8080:8080 furniture-hub
```

Website available at: [http://localhost:8080](http://localhost:8080)

### ☁️ Push to Docker Hub

Tag the image:

```bash
docker tag furniture-hub dhavalpr0310/furniture-hub:latest
```

Push the image:

```bash
docker push dhavalpr0310/furniture-hub:latest
```

---

## ☸️ Kubernetes Deployment

### 🧱 Initial Deployment (2 replicas)

```bash
kubectl apply -f furniture-hub-deployment.yaml
```

This creates:

- Deployment with 2 replicas
- NodePort service

### ⚖️ Scaled Deployment (3 replicas + LoadBalancer)

```bash
kubectl apply -f furniture-hub-deployment-updated.yaml
```

---

## 🌐 Accessing the Application

### 🔌 Start Minikube Tunnel

```bash
minikube tunnel &
```

### 🌍 Port-forward to Host IP

```bash
kubectl port-forward --address 0.0.0.0 service/furniture-hub-service 8080:80 &
```

### 🌐 Open in Browser

- Local machine: [http://localhost:8080](http://localhost:8080)
- From other devices: `http://<your-host-ip>:8080`

---

## 🧰 Kubernetes Management Commands

### 📋 Check Status

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

### 📈 Scale Deployment

```bash
kubectl scale deployment furniture-hub --replicas=3
```

---

## ⚙️ Technical Details

- **Docker Image**: Node.js 18 Alpine + `http-server`
- **Ports**:
  - Container: `8080`
  - Kubernetes Service: `80` → Host `8080`
- **Resources**:
  - Requests: `0.2 CPU`, `256Mi Memory`
  - Limits: `0.5 CPU`, `512Mi Memory`

---

## 🧹 Cleanup

### ❌ Stop Port-Forwarding

```bash
pkill -f "port-forward"
```

### 🧼 Delete Kubernetes Resources

```bash
kubectl delete -f furniture-hub-deployment-updated.yaml
```

---

## ⚠️ Notes

- `EXTERNAL-IP` may show `<pending>` for LoadBalancer in Minikube — this is normal.
- Keep `minikube tunnel` running for LoadBalancer access.
- Public Docker Image: [`dhavalpr0310/furniture-hub:latest`](https://hub.docker.com/r/dhavalpr0310/furniture-hub)

---

## 📄 Summary

This README provides:

- ✅ Clear project structure overview  
- 🐳 Docker setup with build, run, and push steps  
- ☸️ Kubernetes deployment and scaling guide  
- 🧰 Resource management and cleanup commands  
- ⚙️ Technical specifications  
- 🛠️ Helpful troubleshooting notes  

> ✅ Designed for readability on GitHub or any markdown-compatible platform.
