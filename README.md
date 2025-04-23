# Full-Stack Boilerplate Project

A modern full-stack boilerplate project with React, Express, MySQL, and Docker.

## Tech Stack

- **Frontend**: React (with Vite)
- **Backend**: Express.js (Node.js)
- **Database**: MySQL
- **Authentication**: JWT
- **HTTP Client**: Axios
- **Containerization**: Docker + Docker Compose
- **CI/CD**: Jenkins

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── db.js
│   │   └── index.js
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   ├── .env
│   ├── .env.test
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- MySQL (if running locally)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create environment files:
   - Copy `.env.example` to `.env` in the backend directory
   - Update the environment variables as needed

### Running the Application

#### Using Docker Compose

```bash
docker-compose up
```

This will start:
- MySQL database (port 3306)
- Backend server (http://localhost:5000)
- Frontend development server (http://localhost:3000)

#### Running Locally

1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

### Testing

#### Backend Tests

```bash
cd backend
npm run test:unit     # Run unit tests
npm run test:integration  # Run integration tests
npm test             # Run all tests
```

## Features

- User authentication (register/login)
- JWT-based authentication
- Role-based access control (admin/student)
- Protected routes
- CORS configuration
- Error handling middleware
- Database connection pooling
- Docker containerization
- Jenkins CI/CD pipeline

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users

- `GET /api/users/profile` - Get user profile (protected)
- `GET /api/users/admin` - Admin-only endpoint (protected)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 