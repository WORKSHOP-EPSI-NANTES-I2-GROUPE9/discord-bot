# discord-bot
Bot that uses IA to moderates messages

## Running server 
with nodemon
```sh
npm run dev
```
without
```sh
npm start
```

## Docker 

build image
```sh
docker build -t discord-bot .
```
run image DONT FORGET ENVIRONNMENT
```sh
docker run -e BOT_TOKEN=XXXX -e SENTIMENT_API_URL=http://localhost:5000 discord-bot
```


# Env variables
BOT_TOKEN=  
SENTIMENT_API_URL=http://localhost:5000 