const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const memeAPI = 'https://api.imgflip.com/get_memes'; // واجهة برمجة تطبيقات الميمز

client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
if (message.author.bot) return;

const command = message.content.toLowerCase();

if (command === '!meme') {
try {
const response = await axios.get(memeAPI);
const memes = response.data.data.memes;
const randomMeme = memes[Math.floor(Math.random() * memes.length)];

const memeMessage = {
embeds: [{
title: randomMeme.name,
image: {
url: randomMeme.url
},
footer: {
text: `Meme ID: ${randomMeme.id}`
}
}]
};

message.channel.send(memeMessage);
} catch (error) {
console.error('Error fetching meme:', error);
message.channel.send('Something went wrong while fetching a meme. Please try again later.');
}
} else if (command.startsWith('!meme ')) {
const category = command.split(' ')[1].toLowerCase();
try {
const response = await axios.get(memeAPI);
const memes = response.data.data.memes.filter(meme => meme.name.toLowerCase().includes(category));
if (memes.length > 0) {
const randomMeme = memes[Math.floor(Math.random() * memes.length)];

const memeMessage = {
embeds: [{
title: randomMeme.name,
image: {
url: randomMeme.url
},
footer: {
text: `Meme ID: ${randomMeme.id}`
}
}]
};

message.channel.send(memeMessage);
} else {
message.channel.send(`No memes found for category: ${category}`);
}
} catch (error) {
console.error('Error fetching meme:', error);
message.channel.send('Something went wrong while fetching a meme. Please try again later.');
}
}
});

client.login('YOUR_BOT_TOKEN');
