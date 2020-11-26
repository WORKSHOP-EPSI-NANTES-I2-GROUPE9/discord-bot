const Discord = require('discord.js');
const axios = require('axios').default;
const ToxicityMap = require('./toxicityMap')

if (!process.env.SENTIMENT_API_URL) {
    console.error("missing SENTIMENT_API_URL");
    process.exit(1);
}

if (!process.env.BOT_TOKEN) {
    console.error("missing BOT_TOKEN");
    process.exit(1);
}

const DELETE_THRESHOLD = process.env.DELETE_THRESHOLD || 0.3;
const NEGATIVE_THRESHOLD = process.env.NEGATIVE_THRESHOLD || 0.4;
const POSITIVE_THRESHOLD = process.env.POSITIVE_THRESHOLD || 0.7;

const apiUrl = process.env.SENTIMENT_API_URL + "/api/v1/analyses"
const client = new Discord.Client();

// Stateful because POC, otherwise should be stored in database
let channelToxicity = new ToxicityMap() // Map(String channelName, float[] predictions)

const handleNewMessage = msg => {
    if (msg.author.bot) return;
    if (!msg.channel.name) return;

    axios.post(apiUrl, {message: msg.cleanContent})
        .then(res => res.data)
        .then(data => {
            if (data.score < DELETE_THRESHOLD) {
                msg.author.send("No toxicity allowed ! Your message was deleted");
                return msg.delete({reason: "No toxicity !"})
            }
            if (data.score < NEGATIVE_THRESHOLD)
                msg.author.send("Warning: Be polite !");

            channelToxicity.add(msg.channel.name, data.score)

            if (channelToxicity.average(msg.channel.name) < NEGATIVE_THRESHOLD)
                msg.channel.send("@here Warning: Be polite !");

            console.log(msg.channel.name + ":" + channelToxicity.average(msg.channel.name) + ":" + msg.author.id + ":" + msg.cleanContent + ":" + data.score)
     }).catch(console.log)
}

client.on("message", handleNewMessage);
client.on("messageUpdate", handleNewMessage);

client.login(process.env.BOT_TOKEN).then(() => console.log("bot logged in"));
