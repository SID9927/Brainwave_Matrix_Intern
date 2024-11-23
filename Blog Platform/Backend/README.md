# Backend

This is the backend for a blogging application built with Node.js, Express, and MongoDB. It provides RESTful APIs for managing blogs and comments, as well as user authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication
- Create, read, update, and delete blogs
- Add comments to blogs
- Middleware for authentication
- Error handling

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Bcrypt for password hashing
- dotenv for environment variable management

## Installation

1. Clone the repository:
   ```bash
   git clone 
   ```

2. Navigate to the project directory:
   ```bash
   cd backend
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

## Usage

To start the server, run:
```bash
npm start
```

The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login a user
- **GET** `/api/auth/user/:id` - Get user by ID (requires authentication)

### Blogs

- **POST** `/api/blogs` - Create a new blog (requires authentication)
- **GET** `/api/blogs` - Get all blogs
- **GET** `/api/blogs/:id` - Get a blog by ID
- **PUT** `/api/blogs/:id` - Update a blog (requires authentication)
- **DELETE** `/api/blogs/:id` - Delete a blog (requires authentication)

### Comments

- **POST** `/api/comments/blog/:blogId` - Create a new comment (requires authentication)
- **GET** `/api/comments/blog/:blogId` - Get comments for a blog
- **PUT** `/api/comments/:commentId` - Update a comment (requires authentication)
- **DELETE** `/api/comments/:commentId` - Delete a comment (requires authentication)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
