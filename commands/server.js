module.exports = {
	name: 'server',
	description: 'describes the current server',
	guildOnly: true,
	execute(message) {
        message.channel.send(`You are in ${message.guild.name}\nThere are ${message.guild.memberCount-1} members in the server`);
	},
};
