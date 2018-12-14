FROM node:8.13

WORKDIR /users_microservice/

COPY package*.json /users_microservice/

RUN npm install

COPY . /users_microservice/

EXPOSE 3002

CMD ["npm", "start"]
