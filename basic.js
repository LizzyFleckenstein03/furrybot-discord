module.exports = {
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
