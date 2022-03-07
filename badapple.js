const badapple = require("./badapple.json")

module.exports = {
	badapple: {
		operator: true,
		func: msg => msg.reply("loading...")
			.then(canvas => {
				const frames = badapple.frames.map(frame => "```\n" + frame + "```")
				
				const iv = setInterval(_ => {
					const frame = frames.shift()
				
					if (frame)
						canvas.edit(frame)
					else
						clearInterval(iv)
					
				}, 1000 / badapple.fps)
			})
	}
}
