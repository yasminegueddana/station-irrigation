# Station d'irrigation

Application microservices pour la gestion de l'irrigation (Gateway, Energy, Water, Config, Eureka, Frontend Angular, MySQL) déployée avec Docker et Kubernetes.

## Structure du projet

- `backend/` : microservices Spring Boot (gateway, energy, water, config, eureka)
- `frontend/` : application Angular
- `docker/` : Dockerfiles pour chaque service
- `k8s/` : manifests Kubernetes (namespace, services, deployments)
