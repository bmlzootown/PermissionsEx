package com.djrapitops.permissionsex.backends.json;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.util.UUID;

/**
 * Dummmy to use until proper implementations.
 *
 * @author Rsl1122
 */
public class DummyJSONService extends PexJSONService
		implements GroupJSONService, PluginJSONService, UserJSONService, WorldJSONService, BackupJSONService {

	private JsonElement getFromJSON(String json) {
		return new GsonBuilder().setPrettyPrinting().create().fromJson(json, JsonElement.class);
	}

	@Override
	public UserJSONService getUserJSONService() {
		return this;
	}

	@Override
	public GroupJSONService getGroupJSONService() {
		return this;
	}

	@Override
	public WorldJSONService getWorldJSONService() {
		return this;
	}

	@Override
	public PluginJSONService getPluginJSONService() {
		return this;
	}

	@Override
	public BackupJSONService getBackupJSONService() {
		return this;
	}

	@Override
	public JsonArray getAllGroups() {
		return (JsonArray) getFromJSON("{\"name\": \"GroupName\",\"inheritance\": [\"InheritedGroupName\",\"SecondInheritedGroupName\"]," +
				"\"permissions\": [\"plugin.example.permission\",\"-plugin.example.negated.permission\"]," +
				"\"worlds:\": [{\"name\": \"WorldName\"," +
				"\"permissions\": [\"plugin.example.permission\",\"-plugin.example.negated.permission\"]}," +
				"{\"name\": \"WorldName2\",\"permissions\": [\"plugin.example.permission\",\"-plugin.example.negated.permission\"]}]}");
	}

	@Override
	public JsonObject getGroup(String groupName) throws IllegalArgumentException {
		return null;
	}

	@Override
	public void updateGroups(JsonArray groups) {

	}

	@Override
	public JsonArray getAllPlugins() {
		return (JsonArray) getFromJSON("[]");
	}

	@Override
	public JsonObject getPlugin(String pluginName) throws IllegalArgumentException {
		return null;
	}

	@Override
	public JsonArray getAllUsers() {
		return (JsonArray) getFromJSON("[{\"name\": \"Player Name\",\"groups\": [{\"name\": \"GroupName\"}," +
				"{\"name\": \"GroupName2\"}]," +
				"\"permissions\": [\"plugin.example.permission\",\"-plugin.example.negated.permission\"]," +
				"\"worlds:\": [{\"name\": \"WorldName\",\"inheritance\": \"WorldName2\"," +
				"\"permissions\": [\"plugin.example.permission\",\"-plugin.example.negated.permission\"],}," +
				"{\"name\": \"WorldName2\"," +
				"\"permissions\": [\"plugin.example.permission\",\"-plugin.example.negated.permission\"]}]}]");
	}

	@Override
	public JsonObject getUser(UUID uuid) throws IllegalArgumentException {
		return (JsonObject) getFromJSON("{\"name\": \"Player Name\",\"groups\": [{\"name\": \"GroupName\"}," +
				"{\"name\": \"GroupName2\"}]," +
				"\"permissions\": [\"plugin.example.permission\",\"-plugin.example.negated.permission\"]," +
				"\"worlds:\": [{\"name\": \"WorldName\",\"inheritance\": \"WorldName2\"," +
				"\"permissions\": [\"plugin.example.permission\",\"-plugin.example.negated.permission\"],}," +
				"{\"name\": \"WorldName2\"," +
				"\"permissions\": [\"plugin.example.permission\",\"-plugin.example.negated.permission\"]}]}");
	}

	@Override
	public void updateUsers(JsonArray users) {
	}

	@Override
	public JsonArray getAllWorlds() {
		return (JsonArray) getFromJSON("{\"name\": \"WorldName\",\"inheritance\": [\"WorldName2\"]," +
				"\"permissions\": [\"plugin.example.permission\",\"-plugin.example.negated.permission\"]}");
	}

	@Override
	public JsonObject getWorld(String worldName) throws IllegalArgumentException {
		return null;
	}

	@Override
	public void updateWorlds(JsonArray worlds) {

	}

	@Override
	public JsonArray getBackupInformation() {
		return (JsonArray) getFromJSON("[{\"name\": \"BackupName2\",\"created\": 1520760393036 # Epoch ms}]");
	}

	@Override
	public JsonObject createBackup(String name) {
		return null;
	}

	@Override
	public void deleteBackup(String name) throws IllegalArgumentException {

	}

	@Override
	public void duplicateBackup(String name) throws IllegalArgumentException {

	}

	@Override
	public void restoreBackup(String name) throws IllegalArgumentException {

	}
}