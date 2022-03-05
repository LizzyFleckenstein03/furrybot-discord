const fs = require("fs")
const google_images = require("free-google-images")

/*
const furrybot.list_change_command(cmd, list_name, title, status)
	furrybot.commands[cmd] = {
		operator = true,
		func = function(name, target)
			if target then
				if furrybot[list_name][target] == status then
					furrybot.error_message(name, "Player " .. (status and "already" or "not") .. " " .. title .. ": ", target)
				else
					furrybot[list_name][target] = status
					storage:set_string(list_name, minetest.serialize(furrybot[list_name]))
					furrybot.ping_message(name, "Successfully " .. cmd .. (cmd:sub(#cmd, #cmd) == "e" and "" or "e") .. "d " .. target, furrybot.colors.system)
				end
			else
				furrybot.error_message(name, "You need to specify a player")
			end
		end,
	}
end

function furrybot.list_command(cmd, list_name, title)
	furrybot.commands[cmd] = {
		func = function()
			local names = {}

			for name in pairs(furrybot[list_name]) do
				table.insert(names, name)
			end

			furrybot.send("List of " .. title .. ": " .. table.concat(names, ", "), furrybot.colors.system)
		end,
	}
end

function furrybot.choose(list, color)
	return furrybot.colors.random .. list[math.random(#list)] .. color
end

function furrybot.random(min, max, color)
	return furrybot.colors.random .. math.random(min, max) .. color
end

function furrybot.strrandom(str, seed, ...)
	local v = 0
	local pr = PseudoRandom(seed)
	for i = 1, #str do
		v = v + str:byte(i) * pr:next()
	end
	return PseudoRandom(v):next(...)
end

function furrybot.repeat_string(str, times)
	local msg = ""
	for i = 1, times do
		msg = msg .. str
	end
	return msg
end

*/

const getPing = module.exports.getPing = (msg, ping, allowSelf) => {
	if (ping && ping.startsWith("<@!") && ping.endsWith(">")) {
		const id = ping.slice("<@!".length, -">".length)

		if (!allowSelf && id == msg.author.id) {
			msg.reply("Please mention a user other than yourself")
			return
		}
		
		if (msg.guild.members.cache.get(id))
			return id
	}

	msg.reply("Please mention a user")
}

module.exports.uppercase = str => str.slice(0, 1).toUpperCase() + str.slice(1)

module.exports.requestCommand = (help, onRequest, onAccept) => new Object({
	params: "<player>",
	help: "Request to " + help + " another user",
	func: (msg, [targetPing], {requests}) => {
		const target = getPing(msg, targetPing, false)

		if (target) {
			const err = onRequest(msg, target)

			if (err)
				msg.reply(err)
			else
				requests[target] = {
					origin: msg.author.id,
					func: onAccept,
				}
		}
			
	}
})

module.exports.soloRoleplayCommand = (help, action) => new Object({
	help: help,
	func: msg => google_images.searchRandom(help)
		.then(result => msg.channel.send(`<@!${msg.author.id}> ${action}.\n${result.image.url}`))
})

module.exports.interactiveRoleplayCommand = (help, action) => new Object({
	params: "<user>",
	help: help + " another user",
	func: (msg, [targetPing]) => {
		const target = getPing(msg, targetPing, false)

		if (target)
			google_images.searchRandom(help)
				.then(result => msg.channel.send(`<@!${msg.author.id}> ${action} <@!${target}>.\n${result.image.url}`))
	}
})

module.exports.storageLoad = name => {
	try {
		return require(`storage/${name}.json`)
	} catch {}
}

module.exports.storageSave = (name, data) => fs.writeFileSync(`storage/${name}.json`, JSON.stringify(data))

module.exports.choose = (arr, rng = Math) => arr[Math.floor(rng.random() * arr.length)]

module.exports.chooseWeighted = (arr, rng = Math) => {
	let accum = 0
	let edges = []

	arr.forEach((v, k) => {
		edges[k] = (accum += v[1])
	})

	const r = Math.floor(rng.random() * accum)
	return arr.find((_, k) => r < edges[k])[0]
}
