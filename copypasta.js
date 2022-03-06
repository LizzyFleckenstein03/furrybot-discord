module.exports = content => {
	if (content.search("kill yourself") != -1 || content.search("kys") != -1 || content.search("kill your self") != -1 || content.search("kill themselves") != -1)
		return "kys"
	if (content.search("retard") != -1)
		return "retard"
	if (content.search("based") != -1 && content.search("based on") == -1)
		return "based"
	if (content.search("cope") != -1)
		return "cope"
	if ((content.search("i am") != -1 || content.search("i'm") != -1 || content.search("im") != -1) && (content.search("smartest") != -1 || content.search("most intelligent") != -1))
		return "smartest"
	if (content.search("faggot") != -1 || content.search("fagot") != -1)
		return "faggot"
	if (content.search("cuck") != -1)
		return "cuck"
	if (content.search("\\?\\?\\?\\?\\?") != -1)
		return "questionmarks"
	if (content.search("cringe") != -1)
		return "cringe"
	if (content.search("seethe") != -1)
		return "seethe"
}
