# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the rest of the application's files to the container
COPY . .

# Copy the .env file to the container
COPY .env .

# Expose the port the application will run on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]


