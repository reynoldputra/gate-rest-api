# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install
RUN npm install -g nodemon

# Copy the rest of the application files to the container
COPY . .

# Expose port 3000 for the application to listen on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]

