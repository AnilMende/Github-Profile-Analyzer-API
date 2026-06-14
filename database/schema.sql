CREATE DATABASE github_analyzer;

USE github_analyzer;

CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    public_repos INT,
    followers INT,
    following INT,
    profile_url VARCHAR(255),
    avatar_url TEXT,
    account_created_at DATETIME
);