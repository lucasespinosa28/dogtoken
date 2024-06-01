# Dockerfile
FROM node:lts-buster

# Set the working directory inside the container
WORKDIR  /server
ARG osarch=amd64
ARG osname=linux
# Install app dependencies
RUN npm install express cors dotenv zx

# Bundle the app source code
COPY . .
RUN curl https://api.github.com/repos/lilypad-tech/lilypad/releases/latest | grep "browser_download_url.*lilypad-$OSNAME-$OSARCH" | cut -d : -f 2,3 | tr -d \" | wget -qi - -O lilypad
RUN chmod +x lilypad
RUN mv lilypad /usr/local/bin/lilypad
# Expose port 8080
EXPOSE 3001

# Define the command to run when the container starts
CMD ["node", "server.js"]
