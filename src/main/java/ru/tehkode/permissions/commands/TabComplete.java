package ru.tehkode.permissions.commands;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabCompleter;

public class TabComplete implements TabCompleter
{
	private static final String[] COMMANDS = {"groups"};
	// create a static array of values you want to return

	@Override
	public List<String> onTabComplete(CommandSender sender, Command command, String alias, String[] args)
	{
		final List<String> completions = new ArrayList<String>(Arrays.asList(COMMANDS));
		// convert to list
		// org.bukkit.util.StringUtil.copyPartialMatches(args[0], COMMANDS,
		// completions);
		// copy matches of first argument from list (if first arg is 'm' will return
		// just 'minecraft')
		// Collections.sort(completions);
		// you want to sort no?
		return completions;
	}
}
