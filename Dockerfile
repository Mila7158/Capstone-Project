# Use Node.js as the base image
FROM node:20.17.0

# Set working directory
WORKDIR /app

# Copy root package files
COPY package*.json ./

# Install root dependencies (production only)
RUN npm install --only=production

# Copy backend folder
COPY ./backend ./backend

# Set working directory to backend
WORKDIR /app/backend

# Install backend dependencies
RUN npm install

# Install SQLite tools
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

# Start the backend server
CMD ["npm", "start"]