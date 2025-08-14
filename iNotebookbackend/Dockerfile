FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .
RUN mkdir -p /app/temp && chown -R node:node /app/temp
ENV PORT=3000

EXPOSE 3000

USER node

CMD [ "node","index.js" ]