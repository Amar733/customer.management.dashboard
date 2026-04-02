FROM node:20

WORKDIR /my-app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]