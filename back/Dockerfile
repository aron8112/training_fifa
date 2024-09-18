FROM node:16-alpine
WORKDIR /app

COPY package.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

CMD ["node", "index.js"]

EXPOSE 5000