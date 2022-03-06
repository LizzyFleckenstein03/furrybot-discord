const pseudoRandom = require("pseudo-random")
const google_images = require("free-google-images")
const common = require("./common.js")

const asciiGenital = (id, begin, middle, ending) =>
	begin + middle.repeat(2 + Math.floor(pseudoRandom(id).random() * (10 - 2 + 1))) + ending

const asciiDick = id => asciiGenital(id + 1, "8", "=", "D")
const asciiBoob = id => asciiGenital(id + 2, "E", "Ξ", "3")

module.exports = {
	dicksize: {
		params: "[<player>]",
		help: "Display the size of your own or another users's dick",
		func: (msg, [targetPing]) => {
			const target = targetPing ? common.getPing(msg, targetPing, true) : msg.author.id

			if (target)
				msg.reply(`${asciiDick(target)}    ← <@!${target}>'s Dick'`)
		}
	},
	boobsize: {
		params: "[<player>]",
		help: "Display the size of your own or another users's boobs",
		func: (msg, [targetPing]) => {
			const target = targetPing ? common.getPing(msg, targetPing, true) : msg.author.id

			if (target)
				msg.reply(`${asciiBoob(target)}    ← <@!${target}>'s Boobs'`)
		}
	},
	smellfeet: common.requestCommand("smell another user's feet", "wants to smell your feet", _ => {},
		(msg, origin) => google_images.searchRandom("feet")
			.then(result => msg.channel.send(`<@!${origin}> is smelling <@!${msg.author.id}>'s feet. They are kinda stinky!\n${result.image.url}`))
	),
	blowjob: common.requestCommand("suck another user's dick", "wants to suck your dick", _ => {},
		(msg, origin) => google_images.searchRandom("blowjob+meme")
			.then(result => msg.channel.send(`<@!${origin}> is sucking <@!${msg.author.id}>'s cock. ${asciiDick(msg.author.id)} ˣoˣ \n${result.image.url}`))
	),
	sex: common.requestCommand("have sex with another user", "wants to fuck you", _ => {},
		(msg, origin) => google_images.searchRandom("sex+meme")
			.then(result => msg.channel.send(`<@!${origin}> and <@!${msg.author.id}> are having sex! OwO.\n${result.image.url}`))
	),
	cum: {
		help: "Ejaculate.",
		func: msg => google_images.searchRandom("cum+meme")
			.then(result => msg.channel.send(`<@!${msg.author.id}> is cumming: ${asciiDick(msg.author.id)}${"~".repeat(1 + Math.floor(Math.random() * 10))}\n${result.image.url}`))
	},
}
