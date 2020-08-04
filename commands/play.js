const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	aliases: ['yt', 'youtube'],
    description: 'plays a youtube video in vc',
    args: true,
	execute(message,args) {		
        if(message.channel.type!=="text"){
            return;
        }
        const link=args[0]; 
        const voiceChannel=message.member.voice.channel;
        if(!voiceChannel){
            return message.reply("Please join a voice channel in order to use this command");
        }
        voiceChannel.join().then(connection =>{
            const stream= ytdl(link,{filter: 'audioonly'});
            const dispatcher = connection.play(stream);
			dispatcher.on('finish', () => voiceChannel.leave());
        })
	},
};