package com.djrapitops.permissionsex.backends.json;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.UUID;

/**
 * Dummmy to use until proper implementations.
 *
 * @author Rsl1122
 */
public class DummyJSONService extends PexJSONService
		implements GroupJSONService, PluginJSONService, UserJSONService, WorldJSONService {

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
	public JsonArray getAllGroups() {
		return null;
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
		return null;
	}

	@Override
	public JsonObject getPlugin(String pluginName) throws IllegalArgumentException {
		return null;
	}

	@Override
	public JsonArray getAllUsers() {
		return null;
	}

	@Override
	public JsonObject getUser(UUID uuid) throws IllegalArgumentException {
		return null;
	}

	@Override
	public void updateUsers(JsonArray users) {

	}

	@Override
	public JsonArray getAllWorlds() {
		return null;
	}

	@Override
	public JsonObject getWorld(String worldName) throws IllegalArgumentException {
		return null;
	}

	@Override
	public void updateWorlds(JsonArray worlds) {

	}
}