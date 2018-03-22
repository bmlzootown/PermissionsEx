package com.djrapitops.permissionsex.backends.json.obj;

import java.util.List;

public class UserContainer {

	private final String name;
	private final List<String> groups;
	private final List<String> permissions;
	private final List<WorldContainer> worlds;

	public UserContainer(String name, List<String> groups, List<String> permissions, List<WorldContainer> worlds) {
		this.name = name;
		this.groups = groups;
		this.permissions = permissions;
		this.worlds = worlds;
	}

	public String getName() {
		return name;
	}

	public List<String> getGroups() {
		return groups;
	}

	public List<String> getPermissions() {
		return permissions;
	}

	public List<WorldContainer> getWorlds() {
		return worlds;
	}
}
