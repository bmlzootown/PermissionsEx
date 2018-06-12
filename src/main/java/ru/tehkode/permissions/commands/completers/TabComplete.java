//package ru.tehkode.permissions.commands.completers;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.Collections;
//import java.util.List;
//
//import org.bukkit.command.Command;
//import org.bukkit.command.CommandSender;
//import org.bukkit.command.TabCompleter;
//import org.bukkit.util.StringUtil;
//
//import network.aeternum.permissionsex.glang.GList;
//
//public class TabComplete implements TabCompleter
//{
//	private static final String[] COMMANDS = {"groups", "users", "worlds", "reload", "group", "user"};
//
//	@Override
//	public List<String> onTabComplete(CommandSender sender, Command command, String alias, String[] args)
//	{
//		List<String> completions = new ArrayList<String>(Arrays.asList(COMMANDS));
//		GList<String> g = new GList<String>();
//		StringUtil.copyPartialMatches(args[0], completions, g);
//		Collections.sort(g);
//
//		return g;
//	}
//}
