# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the Express.js app listens on (default is often 3000)
EXPOSE 8080

# Define the command to run the application
CMD [ "npm", "start" ]

# Optional: Specify the user to run the application as (for security)
# USER node