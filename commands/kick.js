module.exports = {
	name: 'kick',
	description: 'kicks a user',
	args: true,
	usage: "<user> <role>",
	guildOnly: true,
	permission: "KICK_MEMBERS",
	execute(message) {
		if(message.member.hasPermission("KICK_MEMBERS")){
			const taggedUser = message.mentions.members.first();
			taggedUser.kick();
		}
		else{
			message.channel.send("You do not have permission to do this")
		}
	},
};