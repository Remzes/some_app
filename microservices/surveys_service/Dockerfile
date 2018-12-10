FROM node:8.13

WORKDIR /server_two/

COPY package*.json /server_two/

RUN npm install

COPY . /server_two/

EXPOSE 3011

CMD ["npm", "start"]
