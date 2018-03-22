package com.djrapitops.permissionsex.backends.json.obj;

import java.util.List;

public class GroupContainer {

	private final String name;
	private final List<String> inheritance;
	private final List<String> permissions;
	private final List<WorldContainer> worlds;

	public GroupContainer(String name, List<String> inheritance, List<String> permissions, List<WorldContainer> worlds) {
		this.name = name;
		this.inheritance = inheritance;
		this.permissions = permissions;
		this.worlds = worlds;
	}

	public String getName() {
		return name;
	}

	public List<String> getInheritance() {
		return inheritance;
	}

	public List<String> getPermissions() {
		return permissions;
	}

	public List<WorldContainer> getWorlds() {
		return worlds;
	}
}
