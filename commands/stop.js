const Discord= require("discord.js");
const client= new Discord.Client();

module.exports={
	name:"stop",
	aliases: ['stopyt', 'youtubestop', 'leave'],
	description:"tells the bot to leave vc",
	execute(message){
        const voiceChannel=message.member.voice.channel;
		if(!voiceChannel){
            return message.reply("Please join a voice channel in order to use this command");
        }
        voiceChannel.join().then(connection =>{
            voiceChannel.leave();
        })
	},
};