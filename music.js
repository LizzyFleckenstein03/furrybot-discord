const ytdl = require("ytdl-core")
const voice = require("@discordjs/voice")
const youtubeSearchApi = require("youtube-search-api")

module.exports = {
	play: {
		func: async (msg, urlArr) => {
			const channel = msg.member.voice.channel

			if (! channel)
				return msg.reply("Join a voice channel you fucking moron")

			let url = urlArr.join(" ")

			try {
				new URL(url)
			} catch {
				url = "https://youtube.com/watch?v=" + (await youtubeSearchApi.GetListByKeyword(url, false, 1)).items[0].id
				msg.reply("Playing this: " + url)
			}

			const conn = voice.joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
			})
			const player = voice.createAudioPlayer()

			player.play(voice.createAudioResource(ytdl(url, {filter: "audioonly"}), {inputType: voice.StreamType.Arbitrary}))
			conn.subscribe(player)
		}
	}
}
