# Kubernetes Ingress Lab

A hands-on project demonstrating Kubernetes Ingress routing 
patterns using NGINX Ingress Controller on Minikube.

## What this covers
- Path-based routing (/api, /admin, /)
- Host-based routing (subdomains)
- defaultBackend catch-all
- ClusterIP Services
- Local Docker image builds inside Minikube

## Tech Stack
- Kubernetes (Minikube)
- NGINX Ingress Controller
- Node.js (http module)
- Docker (node:20-alpine)

## Architecture
```
                    ┌─────────────────┐
                    │  NGINX Ingress  │
                    │   Controller    │
                    └────────┬────────┘
           ┌─────────────────┼─────────────────┐
           ▼                 ▼                 ▼
         /                /api             /admin
   svc-frontend          svc-api          admin-svc
   (port 3000)          (port 8080)       (port 9090)
```

## Live Demo Screenshots

### 🏠 Frontend — myapp.com/
![Frontend](screenshots/frontend.png)

### ⚙️ API — myapp.com/api
![API](screenshots/api.png)

### 🔒 Admin — myapp.com/admin
![Admin](screenshots/admin.png)

## Ingress Patterns Demonstrated

### 1. Path-based routing
Traffic enters on port 80 and routes based on URL path

### 2. Host-based routing
Each subdomain routes to a different service:
- myapp.local       → frontend
- api.myapp.local   → api service  
- admin.myapp.local → admin service

### 3. defaultBackend
Any unmatched request falls to a catch-all service

## How to run locally

### Prerequisites
- Minikube
- kubectl
- Docker

### Steps

# Start minikube
minikube start

# Enable ingress
minikube addons enable ingress

# Point docker to minikube
eval $(minikube docker-env)

# Build images
docker build -t svc-frontend:v1 ./apps/frontend
docker build -t svc-api:v1      ./apps/api
docker build -t admin-svc:v1    ./apps/admin

# Apply deployments and services
kubectl apply -f k8s/deployments/

# Apply ingress
kubectl apply -f k8s/ingress/01-path-based-ingress.yaml

# Add to /etc/hosts
echo "$(minikube ip) myapp.com" | sudo tee -a /etc/hosts

# Test
curl --resolve "myapp.com:80:$(minikube ip)" http://myapp.com
curl --resolve "myapp.com:80:$(minikube ip)" http://myapp.com/api
curl --resolve "myapp.com:80:$(minikube ip)" http://myapp.com/admin

## What I learned
- How Ingress replaces multiple NodePort services
- Difference between path-based and host-based routing
- How pathType Prefix vs Exact affects routing
- How defaultBackend catches unmatched requests
- How Minikube's internal Docker daemon works
- Why service selectors must match pod labels exactly
- Debugging real errors: ErrImageNeverPull, 
  label mismatches, selector immutability