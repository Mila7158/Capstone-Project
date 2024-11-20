# Use Node.js as the base image
FROM node:20.17.0

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install --include=dev || cat /root/.npm/_logs/*.log
RUN npm install --include=dev --prefix backend || cat /root/.npm/_logs/*.log
# Ensure dotenv-cli is installed
RUN npm install dotenv-cli

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
    npx dotenv sequelize db:migrate --config backend/config/database.js || echo "Migration failed" && \
    npx dotenv sequelize db:seed:all --config backend/config/database.js || echo "Seeding failed"

# Expose the backend's port
EXPOSE 8000

# Command to start the backend server
CMD ["npm", "start"]