//In future need to add kicking capability and restrict to mods only

module.exports = {
	name: 'kick',
	description: 'kicks a user',
	args: true,
	usage: "<user> <role>",
	guildOnly: true,
	permission: "KICK_MEMBERS",
	execute(message) {
		if(message.member.hasPermission("KICK_MEMBERS")){
			const taggedUser = message.mentions.users.first();
			message.channel.send(`You wanted to kick ${taggedUser}?`);
		}
		else{
			message.channel.send("You do not have permission to do this")
		}
	},
};