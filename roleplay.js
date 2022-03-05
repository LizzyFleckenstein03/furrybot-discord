const common = require("./common.js")

module.exports = {
	cry: common.soloRoleplayCommand("Cry", "cries"),
	laugh: common.soloRoleplayCommand("Laugh", "laughs"),
	confused: common.soloRoleplayCommand("Be confused", "is confused"),
	smile: common.soloRoleplayCommand("Smile", "smiles"),
	hug: common.interactiveRoleplayCommand("Hug", "hugs"),
	cuddle: common.interactiveRoleplayCommand("Cuddle", "cuddles"),
	kiss: common.interactiveRoleplayCommand("Kiss", "kisses"),
	slap: common.interactiveRoleplayCommand("Slap", "slaps"),
}
