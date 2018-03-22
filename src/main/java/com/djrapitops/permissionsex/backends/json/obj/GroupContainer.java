package com.djrapitops.permissionsex.backends.json.obj;

import java.util.List;

public class GroupContainer {

	private final String name;
	private final List<String> inheritance;
	private final List<WorldContainer> worlds;

	public GroupContainer(String name, List<String> inheritance, List<WorldContainer> worlds) {
		this.name = name;
		this.inheritance = inheritance;
		this.worlds = worlds;
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
}
