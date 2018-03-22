package com.djrapitops.permissionsex.backends.json;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

/**
 * Dummmy to use until proper implementations.
 *
 * @author Rsl1122
 */
public class DummyJSONService implements BackupJSONService {

	private JsonElement getFromJSON(String json) {
		return new GsonBuilder().setPrettyPrinting().create().fromJson(json, JsonElement.class);
	}

	@Override
	public JsonArray getBackupInformation() {
		return (JsonArray) getFromJSON("[{\"name\": \"BackupName2\",\"created\": 1520760393036}]");
	}

	@Override
	public JsonObject createBackup(String name) {
		return null;
	}

	@Override
	public void deleteBackup(String name) throws IllegalArgumentException {

	}

	@Override
	public JsonObject duplicateBackup(String name) throws IllegalArgumentException {
		return null;
	}

	@Override
	public void restoreBackup(String name) throws IllegalArgumentException {

	}
}