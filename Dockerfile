# Node Docker File
FROM node:10.15

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/package.json

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.4.0/wait /wait
# RUN chmod +x /wait

RUN npm install

COPY . /app

EXPOSE 5000

CMD ["npm", "start" ]