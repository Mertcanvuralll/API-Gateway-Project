# Node.js Base Image
FROM node:14

# Working Directory
WORKDIR /usr/src/app

# Copy package.json ve package-lock.json
COPY package*.json ./

# Installing Dependencies
RUN npm install

# Copying Code
COPY . .

# Defining Port
EXPOSE 3004

# Starting the Service
CMD ["npm", "start"]
