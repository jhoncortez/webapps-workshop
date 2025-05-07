# Node.js Express Docker Application

This project is a basic Node.js application using Express, configured to run in a Docker container. It includes development support with Nodemon and a script for production deployment.

## Project Structure

```
node-express-docker-app
├── src
│   ├── app.js
│   └── routes
│       └── index.js
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── package.json
├── nodemon.json
└── README.md
```

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd node-express-docker-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

### Running the Application

#### Development

To run the application in development mode with Nodemon, use the following command:

```
npm run dev
```

This will start the application and automatically restart it when changes are made to the source files.

#### Production

To build and run the application in production mode, use Docker:

1. Build the Docker image:

   ```
   docker build -t node-express-docker-app .
   ```

2. Run the Docker container:

   ```
   docker run -p 3000:3000 node-express-docker-app
   ```

Alternatively, you can use Docker Compose to run the application:

```
docker-compose up --build
```

### API Endpoints

- `GET /`: Returns a welcome message.
- Add more endpoints as needed.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.