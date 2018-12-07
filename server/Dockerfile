FROM node:8.13

WORKDIR /server/

COPY package*.json /server/

RUN npm install

COPY . /server/

EXPOSE 3010

CMD ["npm", "start"]
