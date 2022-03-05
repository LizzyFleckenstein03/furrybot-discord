const fs = require("fs")
const google_images = require("free-google-images")

const getPing = module.exports.getPing = (msg, ping, allowSelf) => {
	if (ping && ping.startsWith("<@!") && ping.endsWith(">")) {
		const id = ping.slice("<@!".length, -">".length)

		if (!allowSelf && id == msg.author.id) {
			msg.reply("Please mention a user other than yourself")
			return
		}
		
		if (msg.guild.members.cache.get(id))
			return id
	}

	msg.reply("Please mention a user")
}

module.exports.uppercase = str => str.slice(0, 1).toUpperCase() + str.slice(1)

module.exports.requestCommand = (help, onRequest, onAccept) => new Object({
	params: "<player>",
	help: "Request to " + help + " another user",
	func: (msg, [targetPing], {requests}) => {
		const target = getPing(msg, targetPing, false)

		if (target) {
			const err = onRequest(msg, target)

			if (err)
				msg.reply(err)
			else
				requests[target] = {
					origin: msg.author.id,
					func: onAccept,
				}
		}
			
	}
})

module.exports.soloRoleplayCommand = (help, action) => new Object({
	help: help,
	func: msg => google_images.searchRandom(help)
		.then(result => msg.channel.send(`<@!${msg.author.id}> ${action}.\n${result.image.url}`))
})

module.exports.interactiveRoleplayCommand = (help, action) => new Object({
	params: "<user>",
	help: help + " another user",
	func: (msg, [targetPing]) => {
		const target = getPing(msg, targetPing, false)

		if (target)
			google_images.searchRandom(help)
				.then(result => msg.channel.send(`<@!${msg.author.id}> ${action} <@!${target}>.\n${result.image.url}`))
	}
})

module.exports.storageLoad = name => {
	try {
		return require(`./storage/${name}.json`)
	} catch {}
}

module.exports.storageSave = (name, data) => fs.writeFileSync(`storage/${name}.json`, JSON.stringify(data))

module.exports.choose = (arr, rng = Math) => arr[Math.floor(rng.random() * arr.length)]

module.exports.chooseWeighted = (arr, rng = Math) => {
	let accum = 0
	let edges = []

	arr.forEach((v, k) => {
		edges[k] = (accum += v[1])
	})

	const r = Math.floor(rng.random() * accum)
	return arr.find((_, k) => r < edges[k])[0]
}

module.exports.listCommand = (title, list) => new Object({
	help: "Show list of " + title,
	func: (msg, _, fb) => msg.reply(`List of ${title}: ${Object.keys(fb[list]).map(entry => "<@!" + entry + ">").join(", ")}`)
})

module.exports.listChangeCommand = (action, list, status) => new Object({
	operator: true,
	func: (msg, [targetPing], fb) => {
		const target = getPing(msg, targetPing, true)

		if (target) {
			if (fb[list][target] == status) {
				msg.reply(`<@!${target}> ${status ? "already" : "not"} ${action}.`)
			} else {
				fb[list][target] = status
				module.exports.storageSave(list, fb[list])
				msg.reply(`Successfully ${action} <@!${target}>.`)
			}
		}
	}
})
