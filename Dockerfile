# Use Node.js as the base image
FROM node:20.17.0

# Set working directory
WORKDIR /app

# Copy backend package files and install dependencies
COPY ./package*.json ./
RUN npm install --production

# Copy backend code
COPY . .

# Expose port for the backend
EXPOSE 8000

# Run the backend server
CMD ["npm", "start"]