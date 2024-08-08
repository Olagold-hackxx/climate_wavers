## Climate Wavers Web Application

### Overview

The Climate Wavers web application is a platform focused on fostering environmental awareness and encouraging eco-friendly actions. It features a range of functionalities to engage users in social activities related to environmental issues. This documentation provides a comprehensive guide to the application's setup, features, and API endpoints, covering user authentication, post interactions, notifications, polls, and more.

### Features

- **User Authentication**: Registration, login, email verification, password recovery, and logout.
- **User Profiles**: Manage user profiles, including profile picture uploads and default avatar selection.
- **Posts and Interactions**: Create, update, manage, and interact with posts through comments, reactions, views, and reposts.
- **Polls**: Create, vote, and manage polls.
- **Notifications**: Notify users about activities and allow them to mark notifications as read.
- **User Activity**: Track user activities including posts, comments, reactions, and follows.
- **Bookmarking**: Bookmark posts for later reference.
- **Following**: Follow and unfollow other users.

### Table of Contents

1. [Installation](#installation)
2. [Environment Setup](#environment-setup)
3. [API Endpoints](#api-endpoints)
    - [User Authentication](#user-authentication)
    - [Post Endpoints](#post-endpoints)
    - [Poll Endpoints](#poll-endpoints)
    - [Comment Endpoints](#comment-endpoints)
    - [Reaction Endpoints](#reaction-endpoints)
    - [Repost Endpoints](#repost-endpoints)
    - [View Endpoints](#view-endpoints)
    - [Follow Endpoints](#follow-endpoints)
    - [Bookmark Endpoints](#bookmark-endpoints)
    - [Notification Endpoints](#notification-endpoints)
4. [Models](#models)
5. [Email Sending](#email-sending)
6. [OTP Generation](#otp-generation)
7. [Error Handling](#error-handling)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/climate-wavers-webapp.git
    cd climate-wavers-webapp/backend
    ```

2. **Create a virtual environment:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4. **Apply migrations:**
    ```bash
    python manage.py migrate
    ```

5. **Run the server:**
    ```bash
    python manage.py runserver
    ```

### Environment Setup

Ensure you have the following environment variables set in your `.env` file:

```plaintext
SECRET_KEY=your_secret_key
EMAIL_HOST=smtp.your_email_provider.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@example.com
EMAIL_HOST_PASSWORD=your_email_password
DEFAULT_FROM_EMAIL=your_email@example.com
```

### API Endpoints

#### User Authentication

- **User Registration**
  - **URL:** `POST /api/v1/auth/register/`
  - **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "username": "Username",
        "first_name": "First Name",
        "last_name": "Last Name",
        "country": "Country",
        "state": "State",
        "gender": "male/female",
        "password": "YourPassword123",
        "password2": "YourPassword123",
        "profile_pic": "optional_image_url",
        "default_avatar": "optional_avatar_filename"
    }
    ```
  - **Response:**
    ```json
    {
        "data": {
            "email": "user@example.com",
            "username": "Username",
            "first_name": "First Name",
            "last_name": "Last Name",
            "country": "Country",
            "state": "State",
            "profile_pic": "optional_image_url",
            "default_avatar": "avatar 1.png"
        },
        "message": "Hi First Name, thank you for signing up. A passcode has been sent to your email."
    }
    ```

- **Email Verification**
  - **URL:** `POST /api/v1/auth/verify-email/`
  - **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "otp": "123456"
    }
    ```
  - **Response:**
    ```json
    {
        "message": "Account email verified successfully."
    }
    ```

- **User Login**
  - **URL:** `POST /api/v1/auth/login/`
  - **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "YourPassword123"
    }
    ```
  - **Response:**
    ```json
    {
        "email": "user@example.com",
        "full_name": "First Last",
        "access_token": "your_access_token",
        "refresh_token": "your_refresh_token"
    }
    ```

- **Forgot Password**
  - **URL:** `POST /api/v1/auth/forgot-password/`
  - **Request Body:**
    ```json
    {
        "email": "user@example.com"
    }
    ```
  - **Response:**
    ```json
    {
        "message": "A reset link has been sent to your email."
    }
    ```

- **Reset Password**
  - **URL:** `POST /api/v1/auth/reset-password/`
  - **Request Body:**
    ```json
    {
        "new_password": "NewPassword123",
        "new_password2": "NewPassword123"
    }
    ```
  - **Response:**
    ```json
    {
        "message": "Password reset successfully."
    }
    ```

- **User Logout**
  - **URL:** `POST /api/v1/auth/logout/`
  - **Request Body:**
    ```json
    {
        "refresh_token": "your_refresh_token"
    }
    ```
  - **Response:**
    ```json
    {
        "message": "Logout successful."
    }
    ```

#### Post Endpoints

- **List Posts**
  - **URL:** `GET /api/v1/post/`
  - **Response:** List of posts with annotations for comment count, reaction count, view count, and repost count.

- **Create Post**
  - **URL:** `POST /api/v1/post/`
  - **Request Body:** `title`, `content`, `image`, `audio`
  - **Response:** Created post details.

- **Retrieve Post**
  - **URL:** `GET /api/v1/post/{id}/`
  - **Response:** Post details.

- **Update Post**
  - **URL:** `PUT /api/v1/post/{id}/`
  - **Request Body:** `title`, `content`, `image`, `audio`
  - **Response:** Updated post details.

- **Delete Post**
  - **URL:** `DELETE /api/v1/post/{id}/`
  - **Response:** Success message.

- **Search by Hashtag**
  - **URL:** `GET /api/v1/search-by-hashtag/`
  - **Query Parameters:** `hashtag`, `filter_by`, `location`
  - **Response:** Lists of top posts, latest posts, media posts, and associated people.

- **Trending Hashtags**
  - **URL:** `GET /api/v1/trending/`
  - **Response:** List of trending hashtags.

#### Poll Endpoints

- **List Polls**
  - **URL:** `GET /api/v1/polls/`
  - **Response:** List of polls.

- **Create Poll**
  - **URL:** `POST /api/v1/polls/`
  - **Request Body:** `question`, `options`, `visibility`, `duration`
  - **Response:** Created poll details.

- **Retrieve Poll**
  - **URL:** `GET /api/v1/polls/{id}/`
  - **Response:** Poll details.

- **Update Poll**
  - **URL:** `PUT /api/v1/polls/{id}/`
  - **Request Body:** `question`, `options`, `visibility`, `duration`
  - **Response:** Updated poll details.

- **Delete Poll**
  - **URL:** `DELETE /api/v1/polls/{id}/`
  - **Response:** Success message.

- **Vote in Poll**
  - **URL:** `POST /api/v1/polls/{id}/vote/`
  - **Request Body:** `option`
  - **Response:** Vote status message.

#### Comment Endpoints

- **List Comments**
  - **URL:** `GET /api/v1/comments/`
  - **Response:** List of comments.

- **Create Comment**
  - **URL:** `POST /api/v1/comments/`
  - **Request Body:** `user`, `content_type`, `object_id`, `content`
  - **Response:** Created comment details.

- **Retrieve Comment**
  - **URL:** `GET /api/v1/comments/{id}/`
  - **Response:** Comment details.

- **Update Comment**
  - **URL:** `PUT /api/v1/comments/{id}/`
  - **Request Body:** `content`
  - **Response:** Updated comment details.

- **Delete Comment**
  - **URL:** `DELETE /api/v1/comments/{id}/`
  - **Response:** Success message.

#### Reaction Endpoints

- **List Reactions**
  - **URL:** `

GET /api/v1/reactions/`
  - **Response:** List of reactions.

- **Create Reaction**
  - **URL:** `POST /api/v1/reactions/`
  - **Request Body:** `user`, `content_type`, `object_id`, `reaction_type`
  - **Response:** Created reaction details.

- **Retrieve Reaction**
  - **URL:** `GET /api/v1/reactions/{id}/`
  - **Response:** Reaction details.

- **Update Reaction**
  - **URL:** `PUT /api/v1/reactions/{id}/`
  - **Request Body:** `reaction_type`
  - **Response:** Updated reaction details.

- **Delete Reaction**
  - **URL:** `DELETE /api/v1/reactions/{id}/`
  - **Response:** Success message.

#### Repost Endpoints

- **List Reposts**
  - **URL:** `GET /api/v1/reposts/`
  - **Response:** List of reposts.

- **Create Repost**
  - **URL:** `POST /api/v1/reposts/`
  - **Request Body:** `user`, `content_type`, `object_id`
  - **Response:** Created repost details.

- **Retrieve Repost**
  - **URL:** `GET /api/v1/reposts/{id}/`
  - **Response:** Repost details.

- **Update Repost**
  - **URL:** `PUT /api/v1/reposts/{id}/`
  - **Request Body:** `content_type`, `object_id`
  - **Response:** Updated repost details.

- **Delete Repost**
  - **URL:** `DELETE /api/v1/reposts/{id}/`
  - **Response:** Success message.

#### View Endpoints

- **List Views**
  - **URL:** `GET /api/v1/views/`
  - **Response:** List of views.

- **Create View**
  - **URL:** `POST /api/v1/views/`
  - **Request Body:** `user`, `content_type`, `object_id`
  - **Response:** Created view details.

- **Retrieve View**
  - **URL:** `GET /api/v1/views/{id}/`
  - **Response:** View details.

- **Update View**
  - **URL:** `PUT /api/v1/views/{id}/`
  - **Request Body:** `content_type`, `object_id`
  - **Response:** Updated view details.

- **Delete View**
  - **URL:** `DELETE /api/v1/views/{id}/`
  - **Response:** Success message.

#### Follow Endpoints

- **List Follows**
  - **URL:** `GET /api/v1/follows/`
  - **Response:** List of follows.

- **Create Follow**
  - **URL:** `POST /api/v1/follows/`
  - **Request Body:** `follower`, `following`
  - **Response:** Created follow details.

- **Retrieve Follow**
  - **URL:** `GET /api/v1/follows/{id}/`
  - **Response:** Follow details.

- **Update Follow**
  - **URL:** `PUT /api/v1/follows/{id}/`
  - **Request Body:** `following`
  - **Response:** Updated follow details.

- **Delete Follow**
  - **URL:** `DELETE /api/v1/follows/{id}/`
  - **Response:** Success message.

#### Bookmark Endpoints

- **List Bookmarks**
  - **URL:** `GET /api/v1/bookmarks/`
  - **Response:** List of bookmarks.

- **Create Bookmark**
  - **URL:** `POST /api/v1/bookmarks/`
  - **Request Body:** `user`, `content_type`, `object_id`
  - **Response:** Created bookmark details.

- **Retrieve Bookmark**
  - **URL:** `GET /api/v1/bookmarks/{id}/`
  - **Response:** Bookmark details.

- **Update Bookmark**
  - **URL:** `PUT /api/v1/bookmarks/{id}/`
  - **Request Body:** `content_type`, `object_id`
  - **Response:** Updated bookmark details.

- **Delete Bookmark**
  - **URL:** `DELETE /api/v1/bookmarks/{id}/`
  - **Response:** Success message.

#### Notification Endpoints

- **List Notifications**
  - **URL:** `GET /api/v1/notifications/`
  - **Response:** List of notifications.

- **Create Notification**
  - **URL:** `POST /api/v1/notifications/`
  - **Request Body:** `user`, `content`, `type`, `link`
  - **Response:** Created notification details.

- **Retrieve Notification**
  - **URL:** `GET /api/v1/notifications/{id}/`
  - **Response:** Notification details.

- **Update Notification**
  - **URL:** `PUT /api/v1/notifications/{id}/`
  - **Request Body:** `content`, `type`, `link`
  - **Response:** Updated notification details.

- **Delete Notification**
  - **URL:** `DELETE /api/v1/notifications/{id}/`
  - **Response:** Success message.

### Models

- **User:** Stores user details and preferences.
- **Post:** Represents user posts.
- **Poll:** Represents polls created by users.
- **Comment:** Represents comments on posts.
- **Reaction:** Represents reactions to posts.
- **Repost:** Represents reposts of existing posts.
- **View:** Represents views of posts.
- **Follow:** Represents follower-following relationships.
- **Bookmark:** Represents bookmarked posts.
- **Notification:** Represents notifications sent to users.

### Email Sending

Emails are sent for registration, password recovery, and notifications. Ensure SMTP settings are configured correctly in the environment variables.

### OTP Generation

One-time passcodes (OTPs) are generated for email verification and password resets. The OTPs are stored temporarily and have an expiry time.

### Error Handling

All API endpoints include error handling to provide meaningful responses in case of invalid input, authentication failures, or other issues.
