const child_process = require("child_process")

module.exports = {
	bullshit: {
		help: "Output some random bullshit (ported from the plan9front system)",
		func: msg => {
			const awk = child_process.spawn("awk", ["-f", "bullshit.awk", "bullshit"])
			let data = ""

			awk.stdout.on("data", chunk => {
				data += chunk
			})

			awk.stderr.on("data", console.error)

			awk.on("close", code => {
				if (code == 0)
					msg.reply(data.slice(0, -2))
			})
		}
	}
}
