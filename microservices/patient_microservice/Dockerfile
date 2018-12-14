FROM node:8.13

WORKDIR /patient_microservice/

COPY package*.json /patient_microservice/

RUN npm install

COPY . /patient_microservice/

EXPOSE 3003

CMD ["npm", "start"]
