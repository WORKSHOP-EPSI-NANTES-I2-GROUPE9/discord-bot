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

| Name | Default Value |
| -- | -- |
| BOT_TOKEN |   |
| SENTIMENT_API_URL |  |
| DELETE_THRESHOLD | 0.3 |
| NEGATIVE_THRESHOLD | 0.4 |
| POSITIVE_THRESHOLD | 0.7 |

 # log

msg.channel.name + ":" + channelToxicity.average(msg.channel.name) + ":" + msg.author.id + ":" + msg.cleanContent + ":" + data.percentage)