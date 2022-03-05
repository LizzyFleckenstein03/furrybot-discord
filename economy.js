const google_images = require("free-google-images")
const common = require("./common.js")
let moneyStorage = common.storageLoad("money") || {}

const getMoney = user => moneyStorage[user] || 100
const setMoney = (user, money) => {
	moneyStorage[user] = money
	common.storageSave("money", moneyStorage)
}
const addMoney = (user, add) => setMoney(user, getMoney(user) + add)
const takeMoney = (user, remove) => {
	const money = getMoney(user) - remove

	if (money < 0)
		return false

	setMoney(user, money)
	return true
}

module.exports = {
	money: {
		func: (msg, [targetPing]) => {
			const user = msg.author.id
			const target = targetPing ? common.getPing(msg, targetPing, true) : user

			if (target)
				msg.reply((user == target ? "You have " : `<@!${target}> has `) + getMoney(target) + ":b:.")
		}
	},
	pay: {
		func: (msg, [targetPing, amountStr]) => {
			const user = msg.author.id
			const target = common.getPing(msg, targetPing, false)

			if (target) {
				const amount = parseInt(amountStr)

				if (amount && amount > 0) {
					if (takeMoney(user, amount)) {
						addMoney(target, amount)

						google_images.searchRandom("free+bobux")
							.then(result => msg.channel.send(`<@!${target}>: <@!${user}> has payed you ${amount}:b:.\n${result.image.url}`))
					} else {
						msg.reply("You don't have enough money.")
					}
				} else {
					msg.reply("Invalid amount of money :stuck_out_tongue:")
				}
			}
		}
	}
}
