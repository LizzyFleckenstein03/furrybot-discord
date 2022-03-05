let operators, ignored

furrybot.list_change_command("op", "operators", "an operator", true)
furrybot.list_change_command("deop", "operators", "an operator", nil)
furrybot.list_command("oplist", "operators", "operators")

furrybot.list_change_command("ignore", "ignored", "ignored", true)
furrybot.list_change_command("unignore", "ignored", "ignored", nil)
furrybot.list_command("ignorelist", "ignored", "ignored players")
