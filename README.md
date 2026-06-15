# GitHub Profile Analyzer API

## Overview

GitHub Profile Analyzer API is a backend service built with Node.js, Express.js, MySQL, and the GitHub Public API.

The application analyzes a GitHub user's public profile, extracts useful insights, stores them in a MySQL database, and provides REST APIs to retrieve analyzed profiles.

This project was developed as part of a Node.js Internship Assignment and includes additional analytical features beyond the original requirements.

---

## Deployed URL

* URL : https://github-profile-analyzer-pjwe.onrender.com/

## Deployment Platform :
* Backend : Render
* Database : Railway

---

## Features

### Core Features

* Fetch GitHub user profile using username
* Store profile insights in MySQL
* Retrieve all analyzed profiles
* Retrieve a single analyzed profile by username

### Additional Features

* Repository Language Statistics
* GitHub Account Age Calculation
* Total Stars Across All Repositories
* Most Starred Repository Detection
* Automatic Profile Refresh (Update Existing Records)
* Duplicate Profile Prevention using Unique Constraints

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MySQL (Railway)

### Third-Party API

* GitHub REST API

### Libraries Used

* express
* mysql2
* axios
* cors
* dotenv
* nodemon

---

## Project Structure

```text
│
├── config/
│   └── db.js
│
├── controllers/
│   └── githubController.js
│
├── routes/
│   └── githubRoutes.js
│
├── services/
│   └── githubService.js
│
├── utils/
│   └── githubUtils.js
│
├── app.js
│
└── server.js
```

---

## Database Schema

### github_profiles

| Column             | Type          |
| ------------------ | ------------- |
| id                 | INT           |
| username           | VARCHAR(255)  |
| name               | VARCHAR(255)  |
| bio                | TEXT          |
| public_repos       | INT           |
| followers          | INT           |
| following          | INT           |
| profile_url        | VARCHAR(500)  |
| avatar_url         | VARCHAR(1000) |
| account_created_at | DATETIME      |
| analyzed_at        | TIMESTAMP     |
| updated_at         | TIMESTAMP     |
| language_stats     | TEXT          |
| account_age_years  | INT           |
| total_stars        | INT           |
| most_starred_repo  | VARCHAR(255)  |

---

## Insights Generated

For each GitHub profile, the system stores:

* Username
* Name
* Bio
* Public Repository Count
* Followers Count
* Following Count
* Profile URL
* Avatar URL
* GitHub Account Creation Date
* GitHub Account Age (Years)
* Repository Language Statistics
* Total Stars Received
* Most Starred Repository
* Profile Analysis Timestamp

---

## Environment Variables

```env
PORT=5000

DB_HOST=host
DB_PORT=port
DB_USER=username
DB_PASSWORD=password
DB_NAME=database
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/AnilMende/Github-Profile-Analyzer-API
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

---

## API Endpoints

### Analyze GitHub Profile

Stores or updates GitHub profile insights.

```http
POST /api/github/analyze/:username
```

Example:

```http
POST /api/github/analyze/octocat
```

---

### Get All Profiles

Returns all analyzed profiles.

```http
GET /api/github/profiles
```

Example:

```http
GET /api/github/profiles
```

---

### Get Profile By Username

Returns a specific analyzed profile.

```http
GET /api/github/profiles/:username
```

Example:

```http
GET /api/github/profiles/octocat
```

---

## Sample Response

```json
{
  "success": true,
  "data": {
    "username": "octocat",
    "public_repos": 8,
    "followers": 19000,
    "following": 9,
    "account_age_years": 15,
    "language_stats": {
      "JavaScript": 21,
      "Java": 8
    },
    "total_stars": 35,
    "most_starred_repo": "awesome-project"
  }
}
```

---

## Data Analysis Workflow

```text
Client Request
      │
      ▼
Express Route
      │
      ▼
Controller
      │
      ▼
GitHub API
      │
      ▼
Generate Insights
      │
      ▼
Store in MySQL
      │
      ▼
Return Response
```

---

## Future Improvements

* Pagination Support
* Search and Filtering
* Swagger API Documentation
* Repository Activity Analytics
* Commit Frequency Analysis
* Top Contributed Languages
* GitHub Organization Insights

---

## Author

Anil Kumar

Backend-Focused Full Stack Developer

GitHub: https://github.com/AnilMende
LinkedIn: https://linkedin.com/in/mende-anilkumar-284791228/

```
```
