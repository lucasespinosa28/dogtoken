# Dockerfile
FROM node

# Set the working directory inside the container
WORKDIR  /server
ARG osarch=amd64
ARG osname=linux
# Install app dependencies
RUN npm install express cors

# Bundle the app source code
COPY . .
# Expose port 8080
EXPOSE 3001

# Define the command to run when the container starts
CMD ["node", "server.js"]
