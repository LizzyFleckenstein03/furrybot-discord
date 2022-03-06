const util = require("util")
const google_images = require("free-google-images")
const common = require("./common.js")

const kill_deathmessages = require("./kill_deathmessages.json")
const deathmessages = require("./deathmessages.json")

module.exports = {
	kill: {
		func: (msg, [targetPing]) => {
			const user = msg.author.id
			const target = common.getPing(msg, targetPing, true)

			if (target)
				google_images.searchRandom("kill+meme")
					.then(result => msg.channel.send((target == user
						? `<@!${target}> died due to lack of friends.`
						: util.format(common.choose(kill_deathmessages), `<@!${target}>`, `<@!${user}>`)
					) + `\n${result.image.url}`))
		}
	},
	die: {
		func: msg => {
			google_images.searchRandom("die+meme")
				.then(result => msg.channel.send(util.format(common.choose(deathmessages), `<@!${msg.author.id}>`) + `\n${result.image.url}`))
		}
	},
}
