package com.djrapitops.permissionsex.backends.json.obj;

import java.util.List;

public class UserContainer {

	private final String name;
	private final List<String> groups;
	private final List<WorldContainer> worlds;

	public UserContainer(String name, List<String> groups, List<WorldContainer> worlds) {
		this.name = name;
		this.groups = groups;
		this.worlds = worlds;
	}

	public String getName() {
		return name;
	}

	public List<String> getGroups() {
		return groups;
	}

	public List<WorldContainer> getWorlds() {
		return worlds;
	}
}
