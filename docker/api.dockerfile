FROM node:20.12.2
WORKDIR /var/www
COPY ../src .
RUN npm i -g nodemon
CMD [ "npm", "run", "dev" ]