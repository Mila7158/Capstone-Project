# Use Node.js as the base image
FROM node:20.17.0

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including dev dependencies for build process)
RUN npm install

# Copy the backend folder
COPY ./backend ./backend

# Copy the .env file for backend
COPY ./backend/.env ./backend/.env

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=8000

# Install build tools for SQLite
RUN apt-get update && apt-get install -y sqlite3

# Run the build command to prepare the application
RUN npm run build && \
    npm run sequelize --prefix backend db:seed:undo:all && \
    npm run sequelize --prefix backend db:migrate:undo:all && \
    npm run sequelize --prefix backend db:migrate && \
    npm run sequelize --prefix backend db:seed:all

# Expose the backend's port
EXPOSE 8000

# Command to start the backend server
CMD ["npm", "start"]