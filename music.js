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
			const player = voice.createAudioPlayer()

			player.play(voice.createAudioResource(ytdl(url.join(" "), {filter: "audioonly"}), {inputType: voice.StreamType.Arbitrary}))
			conn.subscribe(player)
		}
	}
}
