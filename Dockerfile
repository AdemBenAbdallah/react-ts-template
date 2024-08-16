FROM node:20-alpine

RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app 

COPY package*.json .

RUN yarn

COPY . .

ENV BASE_URL=http://localhost:3000

EXPOSE 5173

CMD [ "yarn","dev" ]