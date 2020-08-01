const Discord = require('discord.js');
const client = new Discord.Client();

try {
	var config = require("./key.json");
} catch (e){
	console.log("Please create an auth.json like auth.json.example with a bot token or an email and password.\n"+e.stack); // send message for error - no token 
	process.exit(); 
}

client.once("ready", () => {
	console.log("Ready!");
});

client.on("message",message =>{
	if(!message.content.startsWith(config.prefix) || message.author.bot){
		return;
	}
	const args= message.content.slice(config.prefix.length).trim().split(/ +/);
	const botCommand= args.shift().toLowerCase();

	//Tells the user the server name and amount of people in the server
	if(botCommand==="server"){
		message.channel.send(`You are in ${message.guild.name}\nThere are ${message.guild.memberCount-1} members in the server`);
	}

	//Lets the user tell the bot to kick someone (Doesn't acctully kick anyone)
	else if(botCommand==="kick"){
		if(!message.mentions.users.size){
			return message.reply("You must tag a user in order to kick them");
		}
		const taggedUser = message.mentions.users.first();
		message.channel.send(`You wanted to kick ${taggedUser}?`);
	}

	//Tells the user their avatar or someone else's if tagged
	else if(botCommand==="avatar"){
		if(!message.mentions.users.size){
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({format: "png", dynamic: true})}>`);
		}
		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({format: "png", dynamic: true})}>`;
		});

		message.channel.send(avatarList);
	}

	//Bulk deletes 2-100 messages dependent on the number the user specified 
	else if(botCommand==="prune"){
		const amount = parseInt(args[0]);
		if(isNaN(amount)){
			return message.reply("That doesn't seem to be a valid number");
		}
		else if(amount<2||amount>100){
			return message.reply("You must enter a number between 2-100");
		}
		else{
			message.channel.bulkDelete(amount, true).catch(err=> {
				console.error(err);
				message.channel.send("Unforntunatlly I have ran into an error while trying to prune the channel");
			});
		}
		message.channel.send(`I have successfully purned ${amount} messages from the channel`);
	}

});

//Command Handling is next

client.login(config.token);