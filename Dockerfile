# Define the Node.js version as a build argument
ARG NODE_VERSION=21.2.0

# Use an official Node runtime as a parent image
FROM node:${NODE_VERSION}-alpine

# Set the NODE_ENV environment variable
ENV NODE_ENV production

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install all dependencies, including devDependencies
RUN npm install

# Switch to a non-root user
USER node

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "dev"]