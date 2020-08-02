module.exports = {
	name: 'kick',
	description: 'kicks a user',
	args: true,
	usage: "<user> <role>",
	guildOnly: true,
	execute(message, args) {
		const taggedUser = message.mentions.users.first();
		message.channel.send(`You wanted to kick ${taggedUser}?`);
	},
};