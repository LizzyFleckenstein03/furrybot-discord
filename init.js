const Discord = require("discord.js")
const common = require("./common.js")
const copypasta = require("./copypasta.json")
const copypastaTrigger = require("./copypasta.js")

const client = module.exports = new Discord.Client({
	intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.GuildVoiceStates]
})

client.login(process.env.DISCORD_TOKEN)

let fb = {
	commands: {},
	requests: {},
	operators: common.storageLoad("operators") || [],
	ignored: common.storageLoad("ignored") || [],
}


client.on("ready", _ => client.user.setActivity("Leftist propaganda"))

client.on("messageCreate", msg => {
	if (fb.ignored[msg.author.id] || msg.author.id == client.user.id)
		return;

	const trigger = copypastaTrigger(msg.content.toLowerCase())
	if (trigger)
		return msg.reply(copypasta[trigger])

	if (msg.content.startsWith("!")) {
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

const modules = ["basic", "bullshit", "marriage", "http", "roleplay", "death", "economy", "waifu", "operator", "nsfw", "random", "music"]

for (let f of modules) {
	let m = require(`./${f}.js`)

	if (m)
		for (let k in m)
			fb.commands[k] = m[k]
}
