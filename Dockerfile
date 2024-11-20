# Use Node.js as the base image
FROM node:20.17.0

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the backend's port
EXPOSE 8000

# Environment variables should be set through Render or passed during runtime
ENV NODE_ENV=production
ENV PORT=8000

# Command to start the backend server
CMD ["npm", "run", "start:production"]