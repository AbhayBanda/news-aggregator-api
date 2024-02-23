# News Aggregator REST API Documentation

## Introduction

The NewsAPI RESTful Service is designed to provide users with access to news articles based on their preferences. It offers endpoints for user registration, authentication, managing news preferences, and fetching news articles.

## Endpoints

### 1. POST /register

Register a new user.

#### Request

Content-Type: application/json
```shell
{
    "fullName" : "Abhay Banda",
    "email" : "bandaabhay@gmail.com",
    "role" : "admin",
    "password" : "password"
}
```
<hr>

### 2. POST /login

Log in a user.

#### Request

Content-Type: application/json
```shell
{
  "username": "example_user",
  "password": "example_password"
}
```
<hr>

### 3. GET /preferences
Retrieve the news preferences for the logged-in user.

___Authorization: Bearer <JWT_TOKEN>___
<hr>

### 4. PUT /preferences
Update the news preferences for the logged-in user.

#### Request
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```shell
{
  "preferences": "business"
}
```
<hr>

### 5. GET /news
Fetch news articles based on the logged-in user's preferences.

___Authorization: Bearer <JWT_TOKEN>___
<hr>

## Getting Started

Follow the steps below to set up and run the API locally:

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbhayBanda/news-aggregator-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd news-aggregator-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application

  ```bash
    node ./src/app.js
  ```


