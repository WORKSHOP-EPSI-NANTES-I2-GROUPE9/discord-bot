# discord-bot
Bot that uses IA to moderates messages

# Start 

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
docker run --network=host -e BOT_TOKEN=NzgxMDcxNjcyNzM2MjE5MTU3.X74Trg.aifhVrKFfn3tFf6klI3Fs1MTu34  -e SENTIMENT_API_URL=http://localhost:5000 discord-bot
```


# Env variables
BOT_TOKEN
SENTIMENT_API_URL=http://localhost:5000 