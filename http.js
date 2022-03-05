const fetch = require("node-fetch")
const google_images = require("free-google-images")
const common = require("./common.js")

module.exports = {
	google: {
		params: "<keyword> [...]",
		help: "Google Image Search",
		func: (msg, keywords) =>
			google_images.searchRandom(keywords.join(" "), true)
				.then(result => msg.reply(result.image.url))
	},
	verse: {
		func: msg => fetch("https://labs.bible.org/api/?type=json&passage=random")
			.then(res => res.json())
			.then(data => msg.reply(`${data[0].text}\n\t${data[0].bookname} ${data[0].chapter}, ${data[0].verse}`))
	},
	define: {
		func: (msg, term) => term.length > 0 ? fetch("https://api.dictionaryapi.dev/api/v1/entries/en_US/" + term.join(" "))
			.then(res => res.json())
			.then(data => {
				let def = data[0]
				msg.reply(`__**${def.word}**__`
					+ (def.phonetic ? ` _${def.phonetic}_` : "")
					+ "\n\n"
					+ Object.entries(def.meaning).reduce((str, meaning) => str
						+ `_${meaning[0]}_\n`
						+ meaning[1].reduce((str, definition, i) => str + `\t${i + 1}. ${definition.definition}\n`, "")
					, "")
					+ `\n[Definitions from ${def.sourceUrls.join(", ")}]`
				)
			})
			.catch(_ => msg.reply("Not found"))
			: msg.reply("You need to specify a word")
	},
	urban: {
		func: (msg, term) => term.length > 0 ? fetch("https://api.urbandictionary.com/v0/define?term=" + term.join(" "))
			.then(res => res.json())
			.then(data => {
				let def = common.choose(data.list)

				msg.reply(`__**${def.word}**__\n`
					+ def.definition.replace(/\[/g,"").replace(/\]/g,"") + "\n\n"
					+ "**Example:**\n"
					+ def.example.replace(/\[/g,"").replace(/\]/g,"")
				)
			})
			.catch(_ => msg.reply("Not found"))
			: msg.reply("You need to specify a word")
	},
	insult: {
		func: (msg, [targetPing]) => {
			const target = common.getPing(msg, targetPing, true)

			if (target)
				fetch("https://insult.mattbas.org/api/insult")
					.then(res => res.text())
					.then(data => msg.channel.send(`<@!${target}> ${data}`))
		}
	},
	joke: {
		func: (msg, [first, last]) => {
			if (!first) {
				first = "Chuck"
				last = "Norris"
			} else if (!last) {
				last = ""
			}

			fetch(`http://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}`)
				.then(res => res.json())
				.then(data => msg.reply(data.value.joke.replace(/&quot;/g, "\"").replace(/  /g, " ")))
		}
	},
	"8ball": {
		func: msg => fetch("https://8ball.delegator.com/magic/JSON/whatever")
			.then(res => res.json())
			.then(data => msg.reply(data.magic.answer))
	}
}
