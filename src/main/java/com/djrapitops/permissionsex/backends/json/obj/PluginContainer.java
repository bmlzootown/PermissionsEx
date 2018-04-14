package com.djrapitops.permissionsex.backends.json.obj;

import org.bukkit.permissions.Permission;

import java.util.ArrayList;
import java.util.List;

public class PluginContainer {

	private final String name;
	private final List<String> permissions;

	public PluginContainer(String name, List<Permission> permissions) {
		this.name = name;
		this.permissions = new ArrayList<>();
		for (Permission permission : permissions) {
			this.permissions.add(permission.getName());
		}
	}

	public String getName() {
		return name;
	}

	public List<String> getPermissions() {
		return permissions;
	}
}
