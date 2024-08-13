FROM node:20-alpine

RUN addgrounp app && adduser -S -G app app

USER app

WORKDIR /app

COPY package*.json ./

USER root

RUN chown -R app:app .

USER app

RUN yarn 

COPY . .

EXPOSE 5173

CMD yarn dev