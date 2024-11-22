# Use Node.js as the base image
FROM node:20.17.0

# Set the working directory
WORKDIR /app

# Copy the root-level package.json and package-lock.json
COPY package*.json ./

# Install root-level dependencies (if any)
RUN npm install --only=production

# Copy the `backend` folder into the container
COPY ./backend /app/backend

# Set the working directory to `backend`
WORKDIR /app/backend

# Copy the backend-specific package.json and package-lock.json
COPY ./backend/package*.json ./

# Install backend-specific dependencies
RUN npm install --only=production

# Install SQLite tools (if needed for migrations)
RUN apt-get update && apt-get install -y sqlite3

# Build the application, run migrations, and seed the database
RUN npm run build && \
    npx dotenv sequelize db:migrate --config config/database.js && \
    npx dotenv sequelize db:seed:all --config config/database.js

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000

# Expose the backend's port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]