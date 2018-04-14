package com.djrapitops.permissionsex.backends.json.obj;

public class BackupContainer {

	private final String name;
	private final long created;

	public BackupContainer(String name, long created) {
		this.name = name;
		this.created = created;
	}

	public String getName() {
		return name;
	}

	public long getCreated() {
		return created;
	}
}
