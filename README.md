## ToDo Management Application
This is a Next.js 13 ToDo Management Application with TypeScript, Material UI, Docker support, and a simple file based storage system. The app includes features for signing up, signing in, creating, editing, and deleting todos.

## Getting Started
Follow these instructions to get the application up and running.

Prerequisites
- Node.js (version 18 or higher)
- Docker and Docker Compose (optional for containerized deployment)

## Running Normally

Install dependencies:
```bash
npm install
```
Create a .env file in the root directory with the following variables:
```bash
NODE_ENV=development
PORT=3000
```
Run the development server:
```bash
npm run dev
```
Open the app:

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running with Docker
Create a .env file in the root directory with the following variables:
```bash
NODE_ENV=development
PORT=3000
```
Build the Docker image and start the container:
```bash
docker-compose up --build
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

Stop the container:
```bash
docker-compose down
```

## Directory Structure

This project follows the Domain Driven Design (DDD) principles. Here's a breakdown of the project structure:

- ## app/ – Presentation Layer (Next.js Pages and API Routes)

The app directory contains the Next.js App Router, pages, and API routes. This is where the user interface and server-side logic are defined.

- ## components/ – Reusable UI Components

The components directory contains reusable React components that are shared across different pages.

- ## context/ – State Management

The context directory contains React Context Providers to manage global state, such as user auth, todo lists and notifications.

- ## domain/ – Domain Layer (Business Logic and Entities)

The domain directory represents the core business logic and entities of the application. It defines the essential concepts and rules of the domain.

- ## application/ – Application Layer (Use Cases)

The application directory contains Use Cases that represent application specific business logic. These use cases orchestrate operations on the domain entities.

- ## infrastructure/ – Infrastructure Layer (Data Access and Utilities)

The infrastructure directory contains implementation details for data storage, authentication, and other infrastructure-related concerns.
