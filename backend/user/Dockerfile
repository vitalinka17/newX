FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY .. .

RUN npm run build

CMD ["npm", "run", "start:dev"]

EXPOSE 3080
