-- CREATE DATABASE events_db;
-- \c events_db

DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS likes;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  pw_digest VARCHAR(255)
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  event VARCHAR(255),
  text TEXT NOT NULL,
  img_url TEXT,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
  location TEXT NOT NULL
);
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  events_id INTEGER REFERENCES events (id),
  liker_id INTEGER REFERENCES users (id)
);
