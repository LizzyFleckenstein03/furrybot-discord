const pseudoRandom = require("pseudo-random")
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
			const target = targetPing ? common.getPing(targetPing) : msg.author.id

			if (target)
				msg.reply(`${asciiDick(target)}    ← <@!${target}>'s Dick'`)
		}
	},
	boobsize: {
		params: "[<player>]",
		help: "Display the size of your own or another users's boobs",
		func: (msg, [targetPing]) => {
			const target = targetPing ? common.getPing(targetPing) : msg.author.id

			if (target)
				msg.reply(`${asciiBoob(target)}    ← <@!${target}>'s Boobs'`)
		}
	},
}

/*

furrybot.request_command("smellfeet", "smell another player's feet", function(name, target)
	furrybot.ping_message(target, name .. " wants to smell your feet. Type !accept to accept or !deny to deny.", furrybot.colors.system)
end, function(name, target)
	furrybot.ping_message(name, " you are smelling " .. target .. "'s feet. They are kinda stinky!", furrybot.colors.roleplay)
end)

furrybot.request_command("blowjob", "suck another player's dick", function(name, target)
	furrybot.ping_message(target, name .. " wants to suck your dick. Type !accept to accept or !deny to deny.", furrybot.colors.system)
end, function(name, target)
	furrybot.send(name .. " is sucking " .. target .. "'s cock. " .. furrybot.get_ascii_dick(target) .. " ˣoˣ ", furrybot.colors.roleplay)
end)

furrybot.request_command("sex", "have sex with another player", function(name, target)
	furrybot.ping_message(target, name .. " wants to have sex with you. Type !accept to accept or !deny to deny.", furrybot.colors.system)
end, function(name, target)
	furrybot.send(name .. " and " .. target .. " are having sex! OwO", furrybot.colors.roleplay)
end)

furrybot.commands.cum = {
	help = "Cum",
	func = function(name)
		furrybot.send(name .. " is cumming: " .. furrybot.get_ascii_dick(name) .. C("#FFFFFF") .. furrybot.repeat_string("~", math.random(1, 10)), furrybot.colors.roleplay)
	end
}
*/
