package com.djrapitops.permissionsex.backends.json.impl;

import com.djrapitops.permissionsex.backends.json.UserJSONService;
import com.djrapitops.permissionsex.backends.json.obj.UserContainer;
import com.djrapitops.permissionsex.backends.json.obj.WorldContainer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import ru.tehkode.permissions.PermissionManager;
import ru.tehkode.permissions.PermissionUser;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;

public class UserJSONServiceImpl implements UserJSONService {

	private final PermissionsEx pex;

	public UserJSONServiceImpl(PermissionsEx pex) {
		this.pex = pex;
	}

	@Override
	public JsonArray getAllUsers() {
		List<UserContainer> userContainers = new ArrayList<>();

		PermissionManager permissionsManager = pex.getPermissionsManager();
		for (PermissionUser permissionUser : permissionsManager.getUsers()) {
			userContainers.add(getUser(permissionUser));
		}

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<List<UserContainer>>() {
		}.getType();
		String json = gson.toJson(userContainers, type);

		return gson.fromJson(json, JsonArray.class);
	}

	private UserContainer getUser(PermissionUser permissionUser) {
		String name = permissionUser.getName();
		Map<String, List<String>> allPermissions = permissionUser.getAllPermissions();
		List<WorldContainer> worlds = new ArrayList<>();
		for (Map.Entry<String, List<String>> entry : allPermissions.entrySet()) {
			worlds.add(new WorldContainer(entry.getKey(), entry.getValue()));
		}

		List<String> groups = Arrays.asList(permissionUser.getGroupsNames());

		return new UserContainer(name, groups, worlds);
	}

	@Override
	public JsonObject getUser(String playerName) throws IllegalArgumentException {
		PermissionUser user = pex.getPermissionsManager().getUser(playerName);
		if (user == null) {
			throw new IllegalArgumentException(playerName + " not found.");
		}

		UserContainer userContainer = getUser(user);

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<UserContainer>() {
		}.getType();
		String json = gson.toJson(userContainer, type);

		return gson.fromJson(json, JsonObject.class);
	}

	@Override
	public void updateUsers(JsonArray users) {
		pex.getLogger().log(Level.INFO, UserJSONService.class.getSimpleName() +
				" got request to save config but no implementation was present.");
	}
}
