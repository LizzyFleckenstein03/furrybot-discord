const common = require("./common.js")

module.exports = {
	info: {
		help: "Display info about furrybot",
		func: msg => msg.reply("**furrybot** _by Elias Fleckenstein_\n\n"
			+ "Furrybot for Discord: <https://github.com/EliasFleckenstein03/furrybot-discord>\n"
			+ "Original Furrybot Dragonfire CSM: <https://github.com/EliasFleckenstein03/furrybot>\n"
			+ "Custom Google Images API: <https://www.npmjs.com/package/free-google-images>"
		)
	},
	help: {
		params: "[<command>]",
		help: "Display help for a commands or show list of available commands",
		func: (msg, [cmd], {commands}) => {
			if (cmd) {
				let def = commands[cmd]

				if (def)
					msg.reply(`!${cmd}${def.params ? " " + def.params : ""}: ${def.help || "No description given"}`)
				else
					msg.reply(`Invalid command: ${cmd}`)
			} else {
				msg.reply("Available commands:\n\t" + Object.keys(commands).join("\n\t"))
			}
		},
	},
	accept: {
		help: "Accept a request",
		func: (msg, _, {requests}) => {
			const id = 	msg.author.id
			const req = requests[id]

			if (req) {
				delete requests[id]
				req.func(msg, req.origin)
			} else {
				msg.reply("Nothing to accept")
			}
		}
	},
	deny: {
		help: "Deny a request",
		func: (msg, _, {requests}) => {
			const id = msg.author.id
			const req = requests[id]

			if (req) {
				delete requests[id]
				msg.reply(`Denied request from <@!${req.origin}>`)
			} else {
				msg.reply("Nothing to deny")
			}
		}
	}
}
