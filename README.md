# 🚀 OptraHR – Employee Management System (DevOps CI/CD Integrated)

OptraHR is a full-stack **Employee Management System** that streamlines HR operations such as managing employee records, departments, and job roles. This project is designed with modern DevOps principles and integrates tools for automation, containerization, and monitoring.

---

## 🧩 Tech Stack

### 🔧 Backend
- **Spring Boot** (Java)
- **MySQL** (Relational Database)
- **Maven** (Dependency Management)

### 🎨 Frontend
- **React.js**
- **Axios** for API integration

---

## 🛠️ DevOps Toolchain

| Tool        | Purpose                                       |
|-------------|-----------------------------------------------|
| **Git & GitHub** | Version control and repository hosting     |
| **Maven**    | Build automation and dependency management    |
| **Docker**   | Containerization of backend, frontend, and DB |
| **Docker Compose** | Multi-container orchestration            |
| **Ansible**  | Provisioning servers and automating deployment |
| **Jenkins**  | Continuous Integration & Continuous Deployment |
| **Grafana + Graphite** | System monitoring & visualization    |

---

## 🗂️ Project Structure

OptraHR-Devops-project/
│
├── backend/ # Spring Boot source code
├── frontend/ # ReactJS app
├── ansible/ # Ansible playbooks and inventory
├── monitoring/ # Grafana, Graphite, Prometheus config
├── docker-compose.yml # Combined service orchestration
├── Jenkinsfile # CI/CD pipeline definition
└── README.md


---

## 🚦 Features

- Create, update, delete employee records
- Responsive React frontend
- RESTful API integration
- Containerized deployment via Docker
- Automated deployment via Ansible
- CI/CD pipeline via Jenkins
- Real-time system monitoring with Grafana + Graphite

---

## 🚀 CI/CD Pipeline Overview

1. **Code pushed to GitHub**
2. **Jenkins pipeline triggers automatically**
3. **Maven builds the backend**
4. **Docker images created for backend, frontend, MySQL**
5. **Ansible installs dependencies & runs Docker Compose**
6. **Grafana + Graphite monitors CPU, memory, and services**

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Vignesh-V06/OptraHR-Devops-project.git
cd OptraHR-Devops-project
```
### 2. Build Backend (Spring Boot)
```bash
cd backend
mvn clean install
```
### 3. Build Frontend (React)
```bash
cd frontend
npm install
npm run build
```
### 4. Run Locally with Docker Compose
```bash
docker-compose up --build
```
### 5. Ansible Deployment (on target server)
```bash
ansible-playbook ansible/playbook.yml -i ansible/inventory.ini -b --become-user root
```
### 📈 Monitoring Dashboard
- Grafana: http://localhost:3002
View CPU, memory, and container metrics in Grafana via Graphite datasource.

---

### 📬 Author
**Vignesh V**     
**📧 v.vigneshvit06@gmail.com**     
**🌐 GitHub - @Vignesh-V06**
