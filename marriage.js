const common = require("./common.js")
const google_images = require("free-google-images")
let marriages = common.storageLoad("marriages") || {}

module.exports = {
	marry: common.requestCommand("marry another user", "is proposing to you", (msg, target) => {
		const origin = msg.author.id

		if (marriages[origin])
			return `You are already married to <@!${marriages[origin]}>.`
		else if (marriages[target])
			return `<@!${target}> is already married to <@!${marriages[target]}>.`
	}, (msg, origin) => {
		const target = msg.author.id

		google_images.searchRandom("wedding")
			.then(result => msg.reply(`Congratulations, <@!${target}> & <@!${origin}>, you are married. You may now kiss \\:)\n${result.image.url}`))

		marriages[origin] = target
		marriages[target] = origin
		common.storageSave("marriages", marriages)
	}),
	divorce: {
		func: msg => {
			const user = msg.author.id
			const partner = marriages[user]

			if (partner) {
				delete marriages[user]
				delete marriages[partner]
				common.storageSave("marriages", marriages)

				msg.reply(`<@!${user}> divorced from <@!${partner}>.`)
			} else {
				msg.reply("You are not married.")
			}
		},
	},
	partner: {
		func: (msg, [targetPing]) => {
			const user = msg.author.id
			const target = targetPing ? common.getPing(msg, targetPing, true) : user

			if (target) {
				const partner = marriages[target]
				const are = user == target ? "You are" : `<@!${target}> is`

				if (partner)
					msg.reply(are + ` married to <@!${partner}>.`)
				else
					msg.reply(are + " not married.")
			}
		},
	},
}
