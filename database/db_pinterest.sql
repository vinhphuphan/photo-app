-- Create the pinterest schema
CREATE SCHEMA pinterest;

-- Switch to the pinterest schema
USE pinterest;

-- Create the user table
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  birthdate DATETIME,
  avatar VARCHAR(255),
  refresh_token VARCHAR(255)
);

-- Create the photos table
CREATE TABLE photos (
  photo_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  photo_path VARCHAR(255) NOT NULL,
  photo_description TEXT,
  user_id INT,
  CONSTRAINT fk_user_photo FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create the comments table
CREATE TABLE comments (
  comment_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  photo_id INT NOT NULL,
  comment_date DATETIME NOT NULL,
  content TEXT NOT NULL,
  CONSTRAINT fk_user_comment FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_photo_comment FOREIGN KEY (photo_id) REFERENCES photos(photo_id)
);

-- Create the saved_photos table (many-to-many relationship)
CREATE TABLE saved_photos (
  user_id INT NOT NULL,
  photo_id INT NOT NULL,
  save_date DATETIME NOT NULL,
  PRIMARY KEY (user_id, photo_id),
  CONSTRAINT fk_user_saved_photo FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_photo_saved_photo FOREIGN KEY (photo_id) REFERENCES photos(photo_id)
);
