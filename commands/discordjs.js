require("discord.js");

module.exports={
	name:"discordjs",
	description:"brings you to the discord.js website",
	cooldown:5,
	execute(message){
		const exampleEmbed = {
			color: 0x0099ff,
			title: 'discord.js',
			url: 'https://discord.js.org',
			author: {
				name: 'Some name',
				icon_url: 'https://i.imgur.com/wSTFkRM.png',
				url: 'https://discord.js.org',
			},
			description: 'discord.js is a powerful node.js module that allows you to interact with the Discord API very easily. It takes a much more object-oriented approach than most other JS Discord libraries, making your bot\'s code significantly tidier and easier to comprehend. \nUsability, consistency, and performance are key focuses of discord.js, and it also has nearly 100% coverage of the Discord API. It receives new Discord features shortly after they arrive in the API.',
			thumbnail: {
				url: 'https://i.imgur.com/wSTFkRM.png',
			},
			fields: [
				{
					name: '\u200b',
					value: '\u200b',
					inline: false,
				},
			],
			image: {
				url: 'https://i.imgur.com/wSTFkRM.png',
			},
			timestamp: new Date(),
			footer: {
				text: 'Download today',
				icon_url: 'https://i.imgur.com/wSTFkRM.png',
			},
		};
		message.channel.send({ embed: exampleEmbed });
	},
};