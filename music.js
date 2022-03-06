const ytdl = require("ytdl-core")
const voice = require("@discordjs/voice")

module.exports = {
	play: {
		func: (msg, url) => {
			const channel = msg.member.voice.channel
			
			if (! channel)
				return msg.reply("Join a voice channel you fucking moron")

			const conn = voice.joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
			})
	        
			const stream = ytdl(url.join(" "), {filter: "audioonly"})
			const resource = voice.createAudioResource(stream, {inputType: voice.StreamType.Arbitrary})
			const player = voice.createAudioPlayer()
			        
			player.play(resource)
			conn.subscribe(player)
		}
	}
}
