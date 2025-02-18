FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Command to run the application
CMD ["node", "./src/app.js"]
