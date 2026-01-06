# Station d’irrigation

Application microservices pour la gestion d’une station d’irrigation (énergie & eau), basée sur un backend Spring Boot, un frontend Angular, une conteneurisation Docker et un déploiement Kubernetes (Docker Desktop).

---

## 1. Architecture du projet

### 1.1 Backend (`backend/`)

Microservices Spring Boot :

- ⚙️ **Config-Service** — Spring Cloud Config  
- 🔎 **Eureka-Service** — Service Discovery  
- 🚪 **Gateway** — Spring Cloud Gateway  
- ⚡ **Energy-Service** — gestion des pompes et de la consommation énergétique  
- 💧 **Water-Service** — gestion des réservoirs et des volumes d’eau  

### 1.2 Frontend (`frontend/irrigation-frontend/`)

- Application **Angular**  
- Consommation des APIs via le **Gateway**

### 1.3 Docker (`docker/`)

- Dockerfiles pour chaque microservice backend  
- Dockerfile pour le frontend

### 1.4 Kubernetes (`k8s/`)

Manifests Kubernetes pour :

- `Namespace`  
- `Deployments`  
- `Services`  
- `ConfigMaps`  
- `MySQL`

> L’architecture suit un schéma Spring Cloud classique :  
> les microservices se registrent sur **Eureka**, chargent leur configuration depuis **Config-Service** et sont exposés à l’extérieur via le **Gateway**.

---

## 2. Technologies utilisées

### 2.1 Backend

- Java / Spring Boot  
- Spring Cloud (Config, Eureka, Gateway)  
- Spring Data JPA / Hibernate  
- MySQL

### 2.2 Frontend

- Angular  
- TypeScript, HTML, SCSS

### 2.3 Infra / DevOps

- Docker & Docker Desktop  
- Kubernetes (cluster `docker-desktop`)  
- `kubectl`  
- Git / GitHub

---

## 3. Prérequis

- Java 17+  
- Maven  
- Node.js + npm  
- Angular CLI :

```bash
npm install -g @angular/cli
Docker Desktop avec Kubernetes activé (contexte docker-desktop)

4. Exécution en local (sans Docker)
4.1 Backend
Dans chaque microservice (exemple : backend/Energy-Service) :

bash
cd backend/Energy-Service
mvn spring-boot:run
Ordre de démarrage recommandé :

Config-Service

Eureka-Service

Gateway

Energy-Service & Water-Service

Ports typiques :

Service	Port
Config-Service	8888
Eureka-Service	8761
Gateway	8080
Energy-Service	8081
Water-Service	8082
4.2 Frontend
bash
cd frontend/irrigation-frontend
npm install
ng serve --open
Frontend : http://localhost:4200

APIs via Gateway : http://localhost:8080

5. Exécution avec Docker (optionnel)
5.1 Construction des images
Depuis la racine du projet :

bash
# Backend
docker build -f docker/backend/Dockerfile.gateway -t station/gateway .
docker build -f docker/backend/Dockerfile.energy  -t station/energy-service .
docker build -f docker/backend/Dockerfile.water   -t station/water-service .
docker build -f docker/backend/Dockerfile.config  -t station/config-service .
docker build -f docker/backend/Dockerfile.eureka  -t station/eureka-service .

# Frontend
docker build -f docker/frontend/Dockerfile.frontend -t station/frontend .
5.2 Lancement via Docker Compose
bash
docker-compose up -d
Gateway : http://localhost:8080

Frontend : http://localhost:4200

6. Déploiement sur Kubernetes
6.1 Création du namespace
bash
kubectl apply -f k8s/namespace.yaml
6.2 Déploiement des composants
bash
kubectl apply -f k8s/
Cela crée les Deployments et Services pour :

config-service

eureka-service

gateway

energy-service

water-service

frontend

mysql

6.3 Vérification
bash
kubectl get pods -n irrigation
kubectl get svc  -n irrigation
7. Configuration Spring & MySQL
7.1 Config Server
Les microservices récupèrent leur configuration centralisée depuis un dépôt Git via Spring Cloud Config Server.

Dépôt GitLab de configuration :
👉 https://gitlab.com/yasminegueddana/irrigation-config

7.2 Configuration MySQL (Kubernetes)
Connexion MySQL via le service Kubernetes mysql :

text
spring.datasource.url=jdbc:mysql://mysql:3306/irrigation_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
Cette configuration est définie dans le Config Server et chargée automatiquement par les microservices.

7.3 Cycle de démarrage d’un microservice
Le microservice contacte le Config Server.

Il récupère sa configuration ({service-name}.yml).

Il s’enregistre dans Eureka.

Il devient accessible via le Gateway.

8. Fonctionnalités principales
8.1 Energy-Service
Gestion des pompes d’irrigation :

référence, puissance, date de mise en service, statut

APIs REST : création, liste, consultation

8.2 Water-Service
Gestion des réservoirs :

nom, localisation, capacité totale, volume actuel

APIs REST CRUD

8.3 Gateway & Frontend
Centralisation des routes backend :

/energy/**

/water/**

Interface Angular pour :

visualiser les pompes et réservoirs

naviguer entre les modules Énergie / Eau

9. Améliorations futures
🔐 Authentification & autorisation (JWT, Keycloak, etc.)

📊 Monitoring (Spring Boot Actuator, Prometheus, Grafana)

🔁 CI/CD (GitHub Actions)

🚨 Alertes intelligentes (seuils eau / énergie)
