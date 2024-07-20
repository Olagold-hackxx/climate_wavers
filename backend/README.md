# Django App Documentation

## Overview

This Django application is designed to handle user management, email notifications, and messaging using RabbitMQ. It includes features such as user registration, password recovery, and API endpoints for various functionalities.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Email Sending](#email-sending)
7. [RabbitMQ Messaging](#rabbitmq-messaging)
8. [Contributing](#contributing)
9. [License](#license)

## Features

- User registration and activation
- Password reset functionality
- Email notifications for various events
- Messaging using RabbitMQ
- API endpoints for user management, posts, comments, and more
- API documentation using DRF Spectacular

## Installation

### Prerequisites

- Python 3.x
- Django 4.x
- Django REST Framework
- RabbitMQ

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repository.git
   cd your-repository
   ```

2. **Create a virtual environment:**

   ```bash
   python -m venv env
   ```

3. **Activate the virtual environment:**

   - On Windows:
     ```bash
     env\Scripts\activate
     ```

   - On macOS/Linux:
     ```bash
     source env/bin/activate
     ```

4. **Install the required packages:**

   ```bash
   pip install -r requirements.txt
   ```

5. **Apply migrations:**

   ```bash
   python manage.py migrate
   ```

6. **Create a superuser (optional):**

   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server:**

   ```bash
   python manage.py runserver
   ```

## Configuration

### Environment Variables

Ensure you have the following environment variables set:

- `AMQP_URL`: RabbitMQ connection URL
- `FRONTEND_URL`: URL for frontend application

### Settings

Edit `settings.py` to configure:

- **Database settings**
- **Email backend settings**
- **Static and media files settings**

## Usage

### Sending Emails

Use the `Util.send_email()` method to send emails. Provide the following data:

- `template_name`: Path to the HTML template
- `context`: Context data for the template
- `email_subject`: Subject of the email
- `from_email`: Sender's email address
- `to_email`: Recipient's email address

### Messaging with RabbitMQ

Use the `send_message(queue_name, message)` function to send messages to RabbitMQ queues. Supported queue names and message formats are defined in the `QUEUES` and `DATA_TYPES` dictionaries.

## API Endpoints

### Authentication

- **POST** `/api/auth/login/` - Login
- **POST** `/api/auth/logout/` - Logout
- **POST** `/api/auth/reset_password/` - Request password reset

### User Management

- **GET** `/api/user/` - List users
- **POST** `/api/user/` - Create a new user
- **GET** `/api/user/{id}/` - Retrieve user details
- **PUT** `/api/user/{id}/` - Update user details
- **DELETE** `/api/user/{id}/` - Delete a user

### Posts

- **GET** `/api/post/` - List posts
- **POST** `/api/post/` - Create a new post
- **GET** `/api/post/{id}/` - Retrieve post details
- **PUT** `/api/post/{id}/` - Update a post
- **DELETE** `/api/post/{id}/` - Delete a post

### Comments

- **GET** `/api/comment/` - List comments
- **POST** `/api/comment/` - Create a new comment
- **GET** `/api/comment/{id}/` - Retrieve comment details
- **PUT** `/api/comment/{id}/` - Update a comment
- **DELETE** `/api/comment/{id}/` - Delete a comment

## Email Sending

### `EmailThread`

This class is used to send emails asynchronously using threading.

### `Util`

The `send_email()` method in the `Util` class sends an email with HTML and plain text content.

## RabbitMQ Messaging

### Queues

- `custom_mail`
- `forget_password`
- `onboarding`
- `verification`

### Functions

- **`send_message(queue_name, message)`**: Sends a message to the specified RabbitMQ queue.

## Contributing

We welcome contributions to this project. Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test your changes.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.