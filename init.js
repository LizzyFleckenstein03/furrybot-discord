const Discord = require("discord.js")
const common = require("./common.js")

const client = module.exports = new Discord.Client({
	intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages]
})

client.login(process.env.DISCORD_TOKEN)

let fb = {
	commands: {},
	requests: {},
	operators: common.storageLoad("operators") || [],
	ignored: common.storageLoad("ignored") || [],
}

client.on("messageCreate", msg => {
	if (msg.author.id != client.user.id && msg.content.startsWith("!") && !fb.ignored[msg.author.id]) {
		let args = msg.content.replace(/@/g, "\\@").slice(1).split(" ")
		let cmd = args.shift()
		let def = fb.commands[cmd]

		if (def) {
			if (def.operator && !fb.operators[msg.author.id])
				msg.reply(`Sorry, you need to be an operator run this command: ${cmd}`)
			else
				def.func(msg, args, fb)
		} else {
			msg.reply(`Invalid command: ${cmd}`)
		}
	}
})

const modules = ["basic", "bullshit", "marriage", "http", "roleplay", "death", "economy", "waifu", "operator", "nsfw", "random"]

for (let f of modules) {
	let m = require(`./${f}.js`)

	if (m)
		for (let k in m)
			fb.commands[k] = m[k]
}
