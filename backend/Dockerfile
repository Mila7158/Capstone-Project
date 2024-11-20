# Use an official Node.js image as the base
FROM node:20.17.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Specify environment variables required for the app
ENV NODE_ENV=production
ENV PORT=8000
ENV DB_FILE=db/dev.db
ENV JWT_SECRET=6ilVGGDjKR/+/g==
ENV JWT_EXPIRES_IN=604800
ENV SCHEMA=fan_connect_schema

# Command to run the app
CMD ["npm", "start"]