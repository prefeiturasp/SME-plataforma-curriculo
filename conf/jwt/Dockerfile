FROM node:9.11.2

RUN mkdir -p /app 
WORKDIR /app

COPY . ./

EXPOSE 8082

CMD npm install && npm run start
