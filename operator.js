const common = require("./common.js")

module.exports = {
	op: common.listChangeCommand("oped", "operators", true),
	deop: common.listChangeCommand("oped", "operators", false),
	oplist: common.listCommand("operators", "operators"),
	ignore: common.listChangeCommand("ignored", "ignored", true),
	unignore: common.listChangeCommand("ignored", "ignored", false),
	ignorelist: common.listCommand("ignored users", "ignored"),
}
