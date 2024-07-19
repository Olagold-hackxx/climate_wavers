### README for OAuth Microservice

---

# OAuth Microservice

## Overview
The OAuth Microservice provides seamless integration with LinkedIn, GitHub, Facebook, and Google for authentication purposes. This microservice connects with our backend to allow users to authenticate using their preferred social media accounts, enhancing the user experience by offering quick and secure login options.

## Features
- **LinkedIn Authentication**
- **GitHub Authentication**
- **Facebook Authentication**
- **Google Authentication**
- **Integration with Backend**

## Technical Stack
### Programming Languages
- **JavaScript:** Used for the microservice development.

### Frameworks and Libraries
- **Express.js:** Server framework for Node.js.
- **Passport.js:** Middleware for authentication.
- **OAuth2:** Protocol for authorization.
- **Axios:** For making HTTP requests.

### Tools
- **Git:** Version control.
- **Docker:** Containerization.
- **Firebase:** For real-time features.

## Endpoints
### LinkedIn Authentication
- **/api/v1/auth/linkedin**: Initiates LinkedIn OAuth flow.
  - **Method:** GET
  - **Description:** Redirects the user to LinkedIn for authentication.
  
- **/api/v1/auth/linkedin/callback**: Handles LinkedIn OAuth callback.
  - **Method:** GET
  - **Description:** Receives the authorization code and exchanges it for an access token. Then, it retrieves user information and sends it to the backend.

### GitHub Authentication
- **/api/v1/auth/github**: Initiates GitHub OAuth flow.
  - **Method:** GET
  - **Description:** Redirects the user to GitHub for authentication.

- **/api/v1/auth/github/callback**: Handles GitHub OAuth callback.
  - **Method:** GET
  - **Description:** Receives the authorization code and exchanges it for an access token. Then, it retrieves user information and sends it to the backend.

### Facebook Authentication
- **/api/v1/auth/facebook**: Initiates Facebook OAuth flow.
  - **Method:** GET
  - **Description:** Redirects the user to Facebook for authentication.

- **/api/v1/auth/facebook/callback**: Handles Facebook OAuth callback.
  - **Method:** GET
  - **Description:** Receives the authorization code and exchanges it for an access token. Then, it retrieves user information and sends it to the backend.

### Google Authentication
- **/api/v1/auth/google**: Initiates Google OAuth flow.
  - **Method:** GET
  - **Description:** Redirects the user to Google for authentication.

- **/api/v1/auth/google/callback**: Handles Google OAuth callback.
  - **Method:** GET
  - **Description:** Receives the authorization code and exchanges it for an access token. Then, it retrieves user information and sends it to the backend.

## Installation
### Prerequisites
- Node.js

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/climatewavers.git
   cd oauth
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:
   ```bash
   LINKEDIN_CLIENT_ID=your_linkedin_client_id
   LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   FACEBOOK_CLIENT_ID=your_facebook_client_id
   FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   BACKEND_URL=http://your-backend-url
   ```

4. **Run the microservice:**
   ```bash
   npm start
   ```

## Usage
- **LinkedIn Authentication:**
  Navigate to `http://localhost:3000/api/v1/auth/linkedin` to start the LinkedIn authentication process.
  
- **GitHub Authentication:**
  Navigate to `http://localhost:3000/api/v1/auth/github` to start the GitHub authentication process.
  
- **Facebook Authentication:**
  Navigate to `http://localhost:3000/api/v1/auth/facebook` to start the Facebook authentication process.
  
- **Google Authentication:**
  Navigate to `http://localhost:3000/api/v1/auth/google` to start the Google authentication process.

## Contributing
We welcome contributions from the community. Please read our [Contributing Guide](CONTRIBUTING.md) for more details on how to get started.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for more details.

