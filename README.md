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

To provide a complete documentation of your Django application including all the API endpoints, you need to include details about each endpoint in your README file. Here’s an example of how you might structure this information:

### API Endpoints Documentation

#### Base URL

```
http://<your-domain>/api/
```

#### User Endpoints

1. **List Users**
   - **Endpoint:** `/user/`
   - **Method:** `GET`
   - **Description:** Retrieve a list of all users.
   - **Authentication:** Required
   - **Response:** JSON array of user objects

2. **Create User**
   - **Endpoint:** `/user/`
   - **Method:** `POST`
   - **Description:** Create a new user.
   - **Request Body:**
     ```json
     {
       "username": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Response:** JSON object of the created user

3. **Retrieve User**
   - **Endpoint:** `/user/{id}/`
   - **Method:** `GET`
   - **Description:** Retrieve details of a specific user.
   - **Parameters:**
     - `id`: User ID
   - **Response:** JSON object of the user

4. **Update User**
   - **Endpoint:** `/user/{id}/`
   - **Method:** `PUT`
   - **Description:** Update details of a specific user.
   - **Parameters:**
     - `id`: User ID
   - **Request Body:**
     ```json
     {
       "username": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - **Response:** JSON object of the updated user

5. **Delete User**
   - **Endpoint:** `/user/{id}/`
   - **Method:** `DELETE`
   - **Description:** Delete a specific user.
   - **Parameters:**
     - `id`: User ID
   - **Response:** Success message

#### Post Endpoints

1. **List Posts**
   - **Endpoint:** `/post/`
   - **Method:** `GET`
   - **Description:** Retrieve a list of all posts.
   - **Authentication:** Required
   - **Response:** JSON array of post objects

2. **Create Post**
   - **Endpoint:** `/post/`
   - **Method:** `POST`
   - **Description:** Create a new post.
   - **Request Body:**
     ```json
     {
       "title": "string",
       "content": "string",
       "author": "integer"  // User ID
     }
     ```
   - **Response:** JSON object of the created post

3. **Retrieve Post**
   - **Endpoint:** `/post/{id}/`
   - **Method:** `GET`
   - **Description:** Retrieve details of a specific post.
   - **Parameters:**
     - `id`: Post ID
   - **Response:** JSON object of the post

4. **Update Post**
   - **Endpoint:** `/post/{id}/`
   - **Method:** `PUT`
   - **Description:** Update details of a specific post.
   - **Parameters:**
     - `id`: Post ID
   - **Request Body:**
     ```json
     {
       "title": "string",
       "content": "string",
       "author": "integer"  // User ID
     }
     ```
   - **Response:** JSON object of the updated post

5. **Delete Post**
   - **Endpoint:** `/post/{id}/`
   - **Method:** `DELETE`
   - **Description:** Delete a specific post.
   - **Parameters:**
     - `id`: Post ID
   - **Response:** Success message

#### Follower Endpoints

1. **List Followers**
   - **Endpoint:** `/followers/`
   - **Method:** `GET`
   - **Description:** Retrieve a list of all followers.
   - **Authentication:** Required
   - **Response:** JSON array of follower objects

2. **Add Follower**
   - **Endpoint:** `/followers/`
   - **Method:** `POST`
   - **Description:** Add a new follower.
   - **Request Body:**
     ```json
     {
       "user": "integer",   // User ID
       "follower": "integer"  // Follower User ID
     }
     ```
   - **Response:** JSON object of the new follower

3. **Delete Follower**
   - **Endpoint:** `/followers/{id}/`
   - **Method:** `DELETE`
   - **Description:** Remove a follower.
   - **Parameters:**
     - `id`: Follower ID
   - **Response:** Success message

#### Following Endpoints

1. **List Following**
   - **Endpoint:** `/following/`
   - **Method:** `GET`
   - **Description:** Retrieve a list of all following relationships.
   - **Authentication:** Required
   - **Response:** JSON array of following objects

2. **Add Following**
   - **Endpoint:** `/following/`
   - **Method:** `POST`
   - **Description:** Add a new following relationship.
   - **Request Body:**
     ```json
     {
       "user": "integer",   // User ID
       "following": "integer"  // Followed User ID
     }
     ```
   - **Response:** JSON object of the new following

3. **Delete Following**
   - **Endpoint:** `/following/{id}/`
   - **Method:** `DELETE`
   - **Description:** Remove a following relationship.
   - **Parameters:**
     - `id`: Following ID
   - **Response:** Success message

#### Comment Endpoints

1. **List Comments**
   - **Endpoint:** `/comment/`
   - **Method:** `GET`
   - **Description:** Retrieve a list of all comments.
   - **Authentication:** Required
   - **Response:** JSON array of comment objects

2. **Create Comment**
   - **Endpoint:** `/comment/`
   - **Method:** `POST`
   - **Description:** Create a new comment.
   - **Request Body:**
     ```json
     {
       "post": "integer",   // Post ID
       "author": "integer", // User ID
       "content": "string"
     }
     ```
   - **Response:** JSON object of the created comment

3. **Retrieve Comment**
   - **Endpoint:** `/comment/{id}/`
   - **Method:** `GET`
   - **Description:** Retrieve details of a specific comment.
   - **Parameters:**
     - `id`: Comment ID
   - **Response:** JSON object of the comment

4. **Update Comment**
   - **Endpoint:** `/comment/{id}/`
   - **Method:** `PUT`
   - **Description:** Update details of a specific comment.
   - **Parameters:**
     - `id`: Comment ID
   - **Request Body:**
     ```json
     {
       "content": "string"
     }
     ```
   - **Response:** JSON object of the updated comment

5. **Delete Comment**
   - **Endpoint:** `/comment/{id}/`
   - **Method:** `DELETE`
   - **Description:** Delete a specific comment.
   - **Parameters:**
     - `id`: Comment ID
   - **Response:** Success message

#### Subcomment Endpoints

1. **List Subcomments**
   - **Endpoint:** `/subcomment/`
   - **Method:** `GET`
   - **Description:** Retrieve a list of all subcomments.
   - **Authentication:** Required
   - **Response:** JSON array of subcomment objects

2. **Create Subcomment**
   - **Endpoint:** `/subcomment/`
   - **Method:** `POST`
   - **Description:** Create a new subcomment.
   - **Request Body:**
     ```json
     {
       "comment": "integer",   // Comment ID
       "author": "integer",    // User ID
       "content": "string"
     }
     ```
   - **Response:** JSON object of the created subcomment

3. **Retrieve Subcomment**
   - **Endpoint:** `/subcomment/{id}/`
   - **Method:** `GET`
   - **Description:** Retrieve details of a specific subcomment.
   - **Parameters:**
     - `id`: Subcomment ID
   - **Response:** JSON object of the subcomment

4. **Update Subcomment**
   - **Endpoint:** `/subcomment/{id}/`
   - **Method:** `PUT`
   - **Description:** Update details of a specific subcomment.
   - **Parameters:**
     - `id`: Subcomment ID
   - **Request Body:**
     ```json
     {
       "content": "string"
     }
     ```
   - **Response:** JSON object of the updated subcomment

5. **Delete Subcomment**
   - **Endpoint:** `/subcomment/{id}/`
   - **Method:** `DELETE`
   - **Description:** Delete a specific subcomment.
   - **Parameters:**
     - `id`: Subcomment ID
   - **Response:** Success message

#### Like/Save Post Endpoints

1. **List Post Likes/Saves**
   - **Endpoint:** `/like_savepost/`
   - **Method:** `GET`
   - **Description:** Retrieve a list of all likes/saves on posts.
   - **Authentication:** Required
   - **Response:** JSON array of like/save objects

2. **Add Post Like/Save**
   - **Endpoint:** `/like_savepost/`
   - **Method:** `POST`
   - **Description:** Add

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