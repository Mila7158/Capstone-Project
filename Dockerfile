# Use Node.js as the base image
FROM node:20.17.0

# Set the working directory
WORKDIR /app

# Copy the root-level package.json and package-lock.json
COPY package*.json ./

# Install root-level dependencies
RUN npm install --omit=dev

# Copy the backend folder into the container
COPY ./backend /app/backend

# Debug: Verify backend files
RUN ls -la /app/backend

# Install SQLite CLI tools
RUN apt-get update && apt-get install -y sqlite3

# Debug: Verify SQLite CLI is installed
RUN sqlite3 --version

# Debug: Check SQLite database tables and contents
RUN sqlite3 /app/backend/database.sqlite ".tables"
RUN sqlite3 /app/backend/database.sqlite ".tables" | xargs -n 1 -I {} sh -c "echo 'SELECT * FROM {} LIMIT 5;' | sqlite3 /app/backend/database.sqlite"

# Set the working directory to backend
WORKDIR /app/backend

# Install backend-specific dependencies
RUN npm install --omit=dev

# Run migrations and seeds
RUN npx dotenv sequelize db:migrate --config config/database.js && \
    npx dotenv sequelize db:seed:all --config config/database.js

# Run the setup script
RUN node psql-setup-script.js

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8000

# Expose the backend's port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]