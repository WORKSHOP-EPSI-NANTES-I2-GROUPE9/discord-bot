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

const DELETE_THRESHOLD = 0.2;
const NEGATIVE_THRESHOLD = 0.4;
const POSITIVE_THRESHOLD = 0.7;

const apiUrl = process.env.SENTIMENT_API_URL + "/api/v1/analyses"
const client = new Discord.Client();

// Stateful because POC, otherwise should be stored in database
let channelToxicity = new ToxicityMap() // Map(String channelName, float[] predictions)
let userToxicity = new ToxicityMap() // Map(String userId, float[] predictions)

client.on("message", msg => {
    if (msg.author.bot) return;

    axios.post(apiUrl, {message: msg.cleanContent})
        .then(res => res.data)
        .then(data => {
            if (data.percentage < DELETE_THRESHOLD)
                return msg.delete({reason: "No toxicity !"})

            channelToxicity.add(msg.channel.name, data.percentage)
            userToxicity.add(msg.author.id, data.percentage)

            if (userToxicity.mean(msg.author.id) < NEGATIVE_THRESHOLD)
                msg.author.send("Warning: Be polite !");
            if (channelToxicity.mean(msg.channel.name) < NEGATIVE_THRESHOLD)
                msg.channel.send("@here Warning: Be polite !");
     })
});

client.login(process.env.BOT_TOKEN).then(() => console.log("bot logged in"));
