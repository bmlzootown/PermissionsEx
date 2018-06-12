package com.djrapitops.permissionsex.backends.json.obj;

import java.util.List;

public class GroupContainer {

	private final String name;
	private final List<String> inheritance;
	private final List<WorldContainer> worlds;
	private final String ladder;
	private final int ladderRank;
	private final String prefix;

	public GroupContainer(String name, List<String> inheritance, List<WorldContainer> worlds, String ladder, int ladderRank, String prefix) {
		this.name = name;
		this.inheritance = inheritance;
		this.worlds = worlds;
		this.ladder = ladder;
		this.ladderRank = ladderRank;
		this.prefix = prefix;
	}

	public String getName() {
		return name;
	}

	public List<String> getInheritance() {
		return inheritance;
	}

	public List<WorldContainer> getWorlds() {
		return worlds;
	}

	public String getLadder() {
		return ladder;
	}

	public int getLadderRank() {
		return ladderRank;
	}

	public String getPrefix() {
		return prefix;
	}
}
