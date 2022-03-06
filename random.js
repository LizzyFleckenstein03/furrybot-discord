const common = require("./common.js")
const sha1 = require("sha1")
const pseudoRandom = require("pseudo-random")

const german = require("./german.json")
const books = require("./books.json")

module.exports = {
	rolldice: {
		func: msg => msg.channel.send(`<@!${msg.author.id}> rolled a dice and got a ${1 + Math.floor(Math.random() * 6)}.`)
	},
	coinflip: {
		func: msg => msg.channel.send(`<@!${msg.author.id}> flipped a coin and got ${common.choose(["Heads", "Tails"])}.`)
	},
	choose: {
		func: (msg, options) => msg.reply(options.length < 2 ? "Not enough options" : `I choose ${common.choose(options)}.`)
	},
	uwu: {
		func: msg => msg.reply(
			new Array(1 + Math.floor(Math.random() * 10))
			.fill(null)
			.map(_ => new Array(3)
				.fill(common.choose(["u", "ü", "o", "ö"])[common.choose(["toUpperCase", "toLowerCase"])]())
				.fill("w"[common.choose(["toUpperCase", "toLowerCase"])](), 1, 2)
				.join("")
			)
			.join(" ")
		)
	},
	extinct: {
		func: (msg, [rawSpecies]) => {
			const species = common.uppercase((rawSpecies + (rawSpecies.slice(-1) == "s" ? "" : "s")).toLowerCase())
			msg.reply(`${species} are ${pseudoRandom(parseInt(sha1(species), 16) % 1e9).random() < 0.5 ? "" : "not "}extinct.`)
		}
	},
	german: {
		func: msg => msg.reply(common.choose(german))
	},
	book: {
		func: msg => msg.reply(common.choose(books))
	},
	video: {
		func: msg => msg.reply("https://youtube.com/watch?v=dQw4w9WgXcQ")
	},
}

