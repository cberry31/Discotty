const fs= require("fs");
const Discord= require("discord.js");
const client= new Discord.Client();
client.commands= new Discord.Collection();
const commandFiles= fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns= new Discord.Collection();

try {
	var config = require("./key.json");
} catch (e){
	console.log("Please create an auth.json like auth.json.example with a bot token or an email and password.\n"+e.stack); // send message for error - no token 
	process.exit(); 
}

client.once("ready", () => {
	console.log("Ready!");
});

for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name,command);
};


client.on("message",message =>{
	if(!message.content.startsWith(config.prefix) || message.author.bot){
		return;
	}
	const args= message.content.slice(config.prefix.length).trim().split(/ +/);
	const botCommand= args.shift().toLowerCase();
	const cmdFile= client.commands.get(botCommand) 
			|| client.commands.find(cmd=> cmd.aliases && cmd.aliases.includes(botCommand));
	if(!botCommand){
		return;
	}

	if(cmdFile.args && !args.length){
		let reply = `Error: You didn't provide any arguments`;
		if(cmdFile.usage){
			reply+= `\nThe proper usage would be: \`${prefix}${botCommand} ${cmdFile.usage}\``;
		}
		return message.channel.send(reply);
	}

	if(!client.commands.has(botCommand)){
		return;
	}

	if(cmdFile.guildOnly && message.channel.type!=="text"){
		return message.reply("I cannot execute this command inside DMs");
	}


	if(!cooldowns.has(cmdFile.name)){
		cooldowns.set(cmdFile.name, new Discord.Collection());
	}

	const now= Date.now();
	const timestamp= cooldowns.get(cmdFile.name);
	const cooldownAmount= (cmdFile.cooldown || 3)*1000;

	if(timestamp.has(message.author.id)){
		const experationTime= timestamp.get(message.author.id)+cooldownAmount;

		if(now < experationTime){
			const timeLeft= (experationTime-now)/1000;
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds to trying to use the command ${cmdFile.name}`);
		}
	}

	timestamp.set(message.author.id, now);
	setTimeout(() => timestamp.delete(message.author.id), cooldownAmount);



	try{
		cmdFile.execute(message,args);
	} catch(err){
		console.error(err);
		message.reply("There was an error while trying to run the command");
	}

	//Embeds is next

	/*
	//Tells the user the server name and amount of people in the server
	if(botCommand==="server"){
		message.channel.send(`You are in ${message.guild.name}\nThere are ${message.guild.memberCount-1} members in the server`);
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
*/
});



client.login(config.token);