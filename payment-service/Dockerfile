# Node.js Base Image
FROM node:14

# Working Directory
WORKDIR /usr/src/app

# Copy package.json ve package-lock.json
COPY package*.json ./

# Bağımlılıkları Yükleme
RUN npm install

# Kodları Kopyalama
COPY . .

# Port Tanımlama
EXPOSE 3004

# Servisi Başlatma
CMD ["npm", "start"]
