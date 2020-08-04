const fs= require("fs");
const Discord= require("discord.js");
const client= new Discord.Client();
client.commands= new Discord.Collection();
const commandFiles= fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns= new Discord.Collection();
const Canvas = require("canvas");
const ytdl = require('ytdl-core');
const winston = require("winston");
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

//TODOs
//UP NEXT: Common ?s: Misc.

try {
	var config = require("./key.json");
} catch (e){
	logger.log('error', "Please create an auth.json like auth.json.example with a bot token or an email and password.\n"+e.stack); // send message for error - no token 
	process.exit(); 
}

client.once("ready", () => {
	logger.log('info', 'The bot is online');
});

for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name,command);
}

client.on("message",message =>{
	if(!message.content.startsWith(config.prefix) || message.author.bot){
		return;
	}
	const args= message.content.slice(config.prefix.length).trim().split(/ +/);
	const botCommand= args.shift().toLowerCase();
	const cmdFile = client.commands.get(botCommand) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(botCommand));

	if(!cmdFile){
		return message.channel.send("The command you tried to enter was not a vaild command type !help for a list of all the commands");
	}
	
	if(cmdFile.args && !args.length){
		let reply = `Error: You didn't provide any arguments`;
		if(cmdFile.usage){
			reply+= `\nThe proper usage would be: \`${config.prefix}${cmdFile.name} ${cmdFile.usage}\``;
		}
		return message.channel.send(reply);
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
		logger.log('error',err);
		message.reply("There was an error while trying to run the command");
	}
});

client.on("guildMemberAdd", (member) => {
	let guild = member.guild;
	guild.systemChannel.send(`Welcome to the server ${member}`);
	member.send(`Hello and welcome to ${guild.name}`);
});

process.on('unhandledRejection', error => {
	logger.log('error','Unhandled promise rejection:', error);
});

client.login(config.token);