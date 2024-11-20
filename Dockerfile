# Use Node.js as the base image
FROM node:20.17.0

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install all dependencies (including dev dependencies for build process)
RUN npm install

# Copy the rest of the application code
COPY . .

# Run the build command to prepare the application
RUN npm install && \
    npm run build && \
    npm run sequelize --prefix backend db:seed:undo:all && \
    npm run sequelize --prefix backend db:migrate:undo:all && \
    npm run sequelize --prefix backend db:migrate && \
    npm run sequelize --prefix backend db:seed:all

# Expose the backend's port
EXPOSE 8000

# Environment variables should be set through Render or passed during runtime
ENV NODE_ENV=production
ENV PORT=8000

# Command to start the backend server
CMD ["npm", "start"]