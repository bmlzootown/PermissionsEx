package com.djrapitops.permissionsex.backends.json.obj;

import java.util.List;

public class WorldContainer {

	private final String name;
	private final List<String> information;

	public WorldContainer(String name, List<String> information) {
		this.name = name;
		this.information = information;
	}

	public String getName() {
		return name;
	}

	public List<String> getInformation() {
		return information;
	}
}
