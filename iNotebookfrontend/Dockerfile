FROM node:22 AS build


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .

ARG REACT_APP_HOST
ENV REACT_APP_HOST=$REACT_APP_HOST

RUN npm run build

# add multi-stage build to docker image
# reduce the docker image size 

# -------Production Stage---------
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
