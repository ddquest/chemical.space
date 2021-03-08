FROM node:14.0.0

COPY . /opt/app

WORKDIR /opt/app

RUN npm install -g npm-check-updates

RUN npm install

RUN npm run build
