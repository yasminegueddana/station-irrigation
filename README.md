Station d’Irrigation

Application microservices pour la gestion d’une station d’irrigation (énergie & eau)
Backend Spring Boot, frontend Angular, conteneurisation Docker et déploiement sur Kubernetes (Docker Desktop).

Architecture du projet
Backend (backend/)

Microservices Spring Boot :

 Config-Service — Spring Cloud Config

 Eureka-Service — Service Discovery

 Gateway — Spring Cloud Gateway

 Energy-Service — gestion des pompes, consommation, etc.

 Water-Service — gestion des réservoirs, volumes, etc.

 Frontend (frontend/irrigation-frontend/)

Application Angular

Consommation des APIs via le Gateway

Docker (docker/)

Dockerfiles pour chaque microservice backend

Dockerfile pour le frontend

Kubernetes (k8s/)

Manifests Kubernetes :
Namespace, Deployments, Services, ConfigMaps, etc.

 L’architecture suit un schéma Spring Cloud classique :
les microservices se registrent sur Eureka, chargent leur configuration depuis Config-Service et sont exposés à l’extérieur via le Gateway.

Technologies utilisées
Backend

Java / Spring Boot

Spring Cloud (Config, Eureka, Gateway)

Spring Data JPA / Hibernate

MySQL

Frontend

Angular

TypeScript, HTML, SCSS

Infra / DevOps

Docker & Docker Desktop

Kubernetes (cluster docker-desktop)

kubectl

Git / GitHub

Prérequis

Java 17+

Maven

Node.js + npm

Angular CLI

npm install -g @angular/cli


Docker Desktop avec Kubernetes activé
(contexte docker-desktop)

Exécution en local (sans Docker)
🔧 Backend

Dans chaque microservice (exemple : backend/Energy-Service) :

cd backend/Energy-Service
mvn spring-boot:run


Ordre de démarrage recommandé :

Config-Service

Eureka-Service

Gateway

Energy-Service & Water-Service

Ports typiques
Service	Port
Config-Service	8888
Eureka-Service	8761
Gateway	8080
Energy-Service	8081
Water-Service	8082
Frontend
cd frontend/irrigation-frontend
npm install
ng serve --open


Frontend : http://localhost:4200

APIs via Gateway : http://localhost:8080

Exécution avec Docker (optionnel)
 Construction des images
# Depuis la racine du projet
docker build -f docker/backend/Dockerfile.gateway -t station/gateway .
docker build -f docker/backend/Dockerfile.energy -t station/energy-service .
docker build -f docker/backend/Dockerfile.water -t station/water-service .
docker build -f docker/backend/Dockerfile.config -t station/config-service .
docker build -f docker/backend/Dockerfile.eureka -t station/eureka-service .

docker build -f docker/frontend/Dockerfile.frontend -t station/frontend .

 Lancement via Docker Compose
docker-compose up -d


Gateway : http://localhost:8080

Frontend : http://localhost:4200

Déploiement sur Kubernetes
 Création du namespace
kubectl apply -f k8s/namespace.yaml

 Déploiement des composants
kubectl apply -f k8s/


Cela crée :

Deployments & Services pour :

config-service

eureka-service

gateway

energy-service

water-service

frontend

mysql

Vérification :

kubectl get pods -n irrigation
kubectl get svc -n irrigation

 Fonctionnalités principales
 Energy-Service

Gestion des pompes d’irrigation
(référence, puissance, date de mise en service, statut)

APIs REST : création, liste, consultation

 Water-Service

Gestion des réservoirs
(nom, localisation, capacité totale, volume actuel)

APIs REST pour la gestion des réservoirs

 Gateway & Frontend

Gateway centralisant toutes les routes backend :

/energy/**

/water/**

Interface Angular pour :

visualiser les pompes et réservoirs

naviguer entre les modules Énergie / Eau

 Améliorations futures

 Authentification & autorisation

 Monitoring (Spring Boot Actuator, Prometheus, Grafana)

 CI/CD (GitHub Actions)

 Alertes intelligentes (seuils eau / énergie)
