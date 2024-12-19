# Use Node.js 18 as the base image
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

RUN mkdir -p ./src/infrastructure/data

COPY src/infrastructure/data ./src/infrastructure/data

EXPOSE ${PORT:-3000}

CMD ["npm", "run", "dev"]
