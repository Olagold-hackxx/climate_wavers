# Climate Wavers

Climate Wavers is an AI-driven social network focused on climate-based disaster responses. The platform includes a variety of microservices, each with specific roles, to ensure a robust and comprehensive solution for climate action. The goal of Climate Wavers is not only to facilitate disaster relief but also to predict and analyze potential climate disasters.

## Overview

Climate Wavers integrates multiple microservices, including:

1. **Backend Service**: Built with Django, handling user authentication, social media interactions, and a shared MySQL database.
2. **OAuth Microservice**: Provides third-party authentication via LinkedIn, GitHub, Facebook, and Google.
3. **Realtime Response Service**: Handles real-time updates, chatbot interactions, and uses Firebase and RabbitMQ.
4. **Models Microservice**: Includes the magnitude analysis model and recognition model for disaster prediction and response.
5. **Donation DApp**: Built on Solidity, enables users to fund disaster relief and plant trees through our partnership with Tree Nation.
6. **Frontend Service**: Built with React, providing a user interface that integrates all backend services and microservices.

## Microservices

### Backend Service

- **Description**: Handles user authentication, social media interactions, and database management.
- **Technology**: Django, MySQL
- **Location**: `backend-new/`
- **Readme**: `backend-new/README.md`

### OAuth Microservice

- **Description**: Manages third-party authentication (LinkedIn, GitHub, Facebook, Google).
- **Technology**: JavaScript
- **Location**: `oauth/`
- **Readme**: `oauth/README.md`

### Realtime Response Service

- **Description**: Manages real-time updates, chatbots, and generative AI.
- **Technology**: Node.js, Firebase
- **Location**: `response_system/`
- **Readme**: `response_system/README.md`

### Models Microservice

- **Description**: Hosts and serves the magnitude analysis model and recognition model.
- **Technology**: Flask, TensorFlow, Scikit-learn
- **Location**: `models/`
- **Readme**: `models/README.md`

### Donation DApp

- **Description**: Enables users to fund disaster relief and plant trees using our token.
- **Technology**: Solidity
- **Location**: `smart_contract/`
- **Readme**: `smart_contract/README.md`

### Notification Service
- **Description**: Manages sending of emails for disaster alerts, donation alerts, password resets, and more. 
- **Technology**: Node.js, RabbitMQ
- **Location**: `notification/`
- **Readme**: `notification/README.md`

### Frontend Service

- **Description**: Provides the user interface and integrates all backend services and microservices.
- **Technology**: React
- **Location**: `frontend/`
- **Readme**: `frontend/README.md`

## Installation

To run Climate Wavers, follow the installation instructions provided in each microservice's README.

## Contributing

We welcome contributions from the community. Please read the contributing guidelines in each microservice's README.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
