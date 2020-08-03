const Discord= require("discord.js");
const client= new Discord.Client();

module.exports = {
	name: 'ban',
	description: 'bans a user',
	args: true,
	usage: "<user> <role>",
	guildOnly: true,
	permission: "BAN_MEMBERS",
	execute(message) {
		if(message.member.hasPermission("BAN_MEMBERS")){
			const taggedUser = message.mentions.users.first();
			client.members.ban(taggedUser);
		}
		else{
			message.channel.send("You do not have permission to do this")
		}
	},
};