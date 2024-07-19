# Django User Management API

## Overview

This Django application provides a robust user management system with features for user registration, login, password management, and profile management. It includes authentication, password reset, and profile update functionalities.

## Features

- **User Registration:** Allows new users to register with email, username, and password.
- **User Login:** Enables users to log in using their credentials and receive a JWT token for authentication.
- **Password Management:** Provides functionality to change and reset passwords.
- **Profile Management:** Allows users to update their profile information, including profile pictures and bios.
- **Token Management:** Generates and validates JWT tokens for secure authentication.

## Installation

### Prerequisites

Ensure you have the following installed:
- Python 3.8 or later
- Django 4.x
- Django REST Framework
- Django REST Framework Simple JWT
- Pillow (for image handling)

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Set Up the Database

Create a `.env` file in the root directory of the project and add your database configuration. Example:

```
DATABASE_URL=postgres://user:password@localhost:5432/mydatabase
```

Run migrations to set up the database schema:

```bash
python manage.py migrate
```

### Create a Superuser

```bash
python manage.py createsuperuser
```

### Run the Development Server

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000/` to access the application.

## API Endpoints

### User Registration

- **URL:** `/users/`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "username": "exampleuser",
    "email": "user@example.com",
    "password": "password123",
    "cover": "path/to/cover/image.jpg",
    "profile_pic": "path/to/profile/image.jpg",
    "first_name": "First",
    "last_name": "Last",
    "last_location": "Location",
    "is_google_user": false,
    "is_verified": false,
    "is_linkedin_user": false,
    "is_facebook_user": false
  }
  ```

### User Login

- **URL:** `/users/login/`
- **Method:** `POST`
- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "username": "exampleuser",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "jwt-token",
    "user": {
      "id": "user-id",
      "username": "exampleuser",
      "email": "user@example.com",
      ...
    }
  }
  ```

### Change Password

- **URL:** `/users/change_password/`
- **Method:** `POST`
- **Description:** Changes the user's password.
- **Request Body:**
  ```json
  {
    "old_password": "oldpassword123",
    "new_password": "newpassword123"
  }
  ```

### Reset Password

- **URL:** `/users/reset_password/`
- **Method:** `POST`
- **Description:** Sends a password reset email.
- **Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```

### Profile Management

- **URL:** `/users/me/`
- **Method:** `GET`, `PUT`, `PATCH`
- **Description:** Retrieves or updates the authenticated user's profile.
- **Request Body (PUT/PATCH):**
  ```json
  {
    "bio": "New bio",
    "profile_pic": "path/to/new/profile/image.jpg"
  }
  ```

## Token Management

### Check Token

- **URL:** `/users/check-token/`
- **Method:** `POST`
- **Description:** Validates the provided JWT token.
- **Request Body:**
  ```json
  {
    "token": "jwt-token"
  }
  ```

## Testing

To run tests, use the following command:

```bash
python manage.py test
```

## API Documentation

API documentation is available using Swagger and ReDoc:

- **Swagger UI:** `http://127.0.0.1:8000/swagger/`
- **ReDoc:** `http://127.0.0.1:8000/redoc/`

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.