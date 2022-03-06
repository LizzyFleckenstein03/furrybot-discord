const common = require("./common.js")

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
	/*extinct: {
		func: (msg, [rawSpecies]) => {
			const species = common.uppercase(rawSpecies + (rawSpecies.slice(-1) == "s" ? "" : "s"))
			msg.reply(`${species} are ${"extinct"}`)
		}
	}*/
}
/*

furrybot.commands.extinct = {
	func = function(name, species)
		if species then
			species = furrybot.uppercase(species .. (species:sub(#species, #species):lower() == "s" and "" or "s"))
			furrybot.ping_message(name, species  .. " are " .. (furrybot.strrandom(species, 420, 0, 1) == 0 and "not " or "") .. "extinct." , furrybot.colors.system)
		else
			furrybot.error_message(name, "You need to specify a species")
		end
	end,
}

furrybot.commands.german = {
	func = function(name)
		local messages = {
			"Schnauze!",
			"Sprich Deutsch, du Hurensohn!",
			"NEIN NEIN NEIN NEIN NEIN NEIN",
			"Deine Mutter",
			"Das war ein BEFEHL!",
			"Das bleibt hier alles so wie das hier ist!",
			"Scheißße",
			"Digga was falsch bei dir",
			"Lass mich deine Arschfalten sehen",
			"Krieg mal deinen Ödipuskomplex unter Kontrolle",
			"Meine Nudel ist 30cm lang und al dente",
			"Wie die Nase eines Mannes, so auch sein Johannes.",
		}

		local msg = messages[math.random(#messages)]
		local stripe = math.floor(#msg / 3)

		furrybot.ping_message(name, msg:sub(1, stripe) .. C("red") .. msg:sub(stripe + 1, stripe * 2) .. C("yellow") .. msg:sub(stripe * 2 + 1, #msg), C("black"))
	end,
}

furrybot.commands.color = {
	func = function(name)
		local color = string.format("#%06x", math.random(16777216) - 1):upper()

		furrybot.ping_message(name, "Here's your color: " .. C(color) .. color, furrybot.colors.system)
	end,
}

furrybot.commands.book = {
	func = function(name)
		local books = {
			"Johann Wolfgang von Goethe - Faust, Der Tragödie Erster Teil",
			"Johann Wolfgang von Goethe - Faust, Der Tragödie Zweiter Teil",
			"Karl Marx & Friedrich Engels - The Communist Manifesto",
			"Brian Kernhigan & Dennis Ritchie - The C Programming Language",
			"Heinrich Heine - Die Harzreise",
			"Johann Wolfgang von Goethe - Die Leiden des jungen Werther",
			"Friedrich Schiller - Die Jungfrau von Orleans",
			"Theodor Fontane - Irrungen, Wirrungen",
			"Friedrich Schiller - Die Räuber",
			"Theodor Storm - Der Schimmelreiter",
			"Josef von Eichendorff - Aus dem Leben eines Taugenichts",
			"Richard Esplin - Advanced Linux Programming",
			"Joey de Vries - Learn OpenGL",
			"Gerard Beekmans - Linux From Scratch",
		}

		furrybot.ping_message(name, books[math.random(#books)], furrybot.colors.system)
	end,
}

furrybot.commands.video = {
	func = function(name)
		furrybot.ping_message(name, "https://youtube.com/watch?v=dQw4w9WgXcQ", furrybot.colors.system)
	end,
}
*/
