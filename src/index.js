const Discord = require('discord.js');

if (!process.env.SENTIMENT_API_URL) {
    console.error("missing SENTIMENT_API_URL");
    process.exit(1);
}

if (!process.env.BOT_TOKEN) {
    console.error("missing BOT_TOKEN");
    process.exit(1);
}

const client = new Discord.Client();

// Stateful because POC, otherwise should be stored in database
let channelToxicity = new Map() // Map(String channelName, float[] predictions)
let userToxicity = new Map() // Map(String userId, float[] predictions)

client.on("message", message => {
    console.log(message.client.id)
});



client.login(process.env.BOT_TOKEN);
