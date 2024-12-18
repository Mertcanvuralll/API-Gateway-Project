# **API Gateway - Airline System**

This project implements a **microservice architecture** for an **Airline System** using an **API Gateway** to route requests to different services. It leverages **Docker Compose** for container orchestration, and **RabbitMQ** for asynchronous messaging. **Swagger UI** is integrated for API documentation and testing.

---

## **Project Links**
- **Source Code:** https://github.com/Mertcanvuralll/API-Gateway-Project
- **Swagger UI:** http://localhost:3000/api-docs/
- **Demonstration Video:** https://www.youtube.com/watch?v=BJv6O34-jN4

---

## **Project Overview**

The **API Gateway** routes incoming requests to corresponding microservices:

- **Service-A** (Admin): Manages flight addition and capacity queries.
- **Service-B** (Auth): Handles user authentication and issues JWT tokens.
- **Service-C** (Mobile): Manages ticket purchases, flight check-ins, and flight listings.
- **Payment Service**: Handles payment requests by sending data to a RabbitMQ queue.

---

## **Technologies Used**

- **Node.js & Express.js**: Framework for backend service implementation.
- **Docker & Docker Compose**: Containerization and service orchestration.
- **RabbitMQ**: Asynchronous messaging for communication between services.
- **Swagger UI**: API testing and documentation tool.
- **JWT (JSON Web Token)**: Authentication and authorization mechanism.

---

## **System Architecture**

### **API Gateway**
The API Gateway acts as a single entry point to route requests to appropriate microservices.

**Routing Rules**:
- `/admin/*` → **Service-A**
- `/auth/*` → **Service-B**
- `/mobile/*`, `/tickets/*` → **Service-C**
- `/make-payment` → **Payment Service**

---

### **Microservices**

#### **Service-A (Admin)**
- `POST /admin/flights` - Add a new flight.
- `GET /admin/flights/capacity` - Query flights by capacity.

---

#### **Service-B (Auth)**
- `POST /auth/login` - User login and JWT token generation.

---

#### **Service-C (Mobile)**
- `GET /mobile/flights` - Query flights with pagination.
- `POST /tickets` - Purchase a ticket.
- `POST /tickets/checkin` - Check-in for a flight.

---

#### **Payment Service**
- `POST /make-payment` - Send payment data to RabbitMQ for asynchronous processing.

---

### **RabbitMQ**
RabbitMQ acts as a message broker to decouple communication between services. Payment requests are sent to the queue.

---

## **Docker Setup**

The services are containerized using **Docker Compose**.

### **docker-compose.yml**
```yaml
version: '3.8'
services:
  api-gateway:
    build: ./api-gateway
    ports:
      - "3000:3000"
  service-a:
    build: ./service-a
    ports:
      - "3001:3001"
  service-b:
    build: ./service-b
    ports:
      - "3002:3002"
  service-c:
    build: ./service-c
    ports:
      - "3003:3003"
  payment-service:
    build: ./payment-service
    ports:
      - "3004:3004"
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
```
---

## **Swagger Endpoints**

### **Admin (Service-A)**
- **POST** `/admin/flights` - Add a new flight.
- **GET** `/admin/flights/capacity` - Query flights by capacity.

### **Auth (Service-B)**
- **POST** `/auth/login` - User login.

### **Mobile (Service-C)**
- **GET** `/mobile/flights` - Query flights with pagination.
- **POST** `/tickets` - Purchase a ticket.
- **POST** `/tickets/checkin` - Check-in for a flight.

### **Payment**
- **POST** `/make-payment` - Send payment data to RabbitMQ.

---

## **Assumptions**

- RabbitMQ runs on port `5672` for messaging and `15672` for the management UI.
- JWT authentication requires the following credentials:

```json
{
  "username": "admin",
  "password": "admin123"
}
```
---

## **Port Mapping**
- **Service-A** → `3001`  
- **Service-B** → `3002`  
- **Service-C** → `3003`  
- **Payment Service** → `3004`  
- **RabbitMQ** → `15672` (UI)  

---

## **Challenges and Solutions**

### **1. Missing Dependencies**
- **Issue**: `Cannot find module 'express'`.  
- **Solution**: Install dependencies for each service:
   ```bash
   cd service-a && npm install
   cd service-b && npm install
   cd service-c && npm install
   cd payment-service && npm install

---

### **2. Routing Issues**
- **Issue**: `/tickets` endpoint did not route correctly.  
- **Solution**: Added an explicit route in the API Gateway configuration.

### **3. Port Conflicts**
- **Issue**: Payment Service port (`3001`) conflicted with Service-A.  
- **Solution**: Updated Payment Service port to `3004`.

### **4. RabbitMQ Connectivity**
- **Issue**: RabbitMQ hostname mismatch in Docker.  
- **Solution**: Updated the RabbitMQ connection hostname to `rabbitmq` in Payment Service.

---

## **Conclusion**

This project demonstrates:
- How to build a **microservice architecture** using an **API Gateway**.
- Integration of **RabbitMQ** for asynchronous messaging.
- Containerization and orchestration using **Docker Compose**.
- API testing and documentation using **Swagger UI**.
