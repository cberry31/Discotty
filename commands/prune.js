//Need to make for mods only

module.exports={
    name:"prune",
    aliases:['purge'],
    description:"remove messages in the current channel",
    args: true,
    execute(message,args){
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
    },
};