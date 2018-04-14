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
import java.util.*;
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

		List<String> groups = permissionUser.getParentIdentifiers();

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
		Type type = new TypeToken<List<UserContainer>>() {
		}.getType();
		List<UserContainer> userList = new Gson().fromJson(users, type);

		PermissionManager backend = pex.getPermissionsManager();
		pex.getLogger().log(Level.INFO, "Begun saving users received from Dashboard (" + userList.size() + ")..");

		Set<PermissionUser> backendUsers = backend.getUsers();
		Map<String, PermissionUser> backendUserMap = new HashMap<>();
		for (PermissionUser backendUser : backendUsers) {
			backendUserMap.put(backendUser.getName(), backendUser);
		}

		Set<String> existingUsers = new HashSet<>();
		for (UserContainer userContainer : userList) {
			String userName = userContainer.getName();
			existingUsers.add(userName);
			boolean save = false;

			PermissionUser user = backendUserMap.get(userName);
			if (user == null) {
				user = backend.getUser(userName);
			}

			List<String> oldGroups = user.getParentIdentifiers();
			List<String> newGroups = userContainer.getGroups();
			if (!oldGroups.equals(newGroups)) {
				user.setParentsIdentifier(newGroups);
				save = true;
			}

			List<WorldContainer> worlds = userContainer.getWorlds();

			Map<String, List<String>> allPermissions = user.getAllPermissions();
			for (WorldContainer world : worlds) {
				// World with null name contains general permissions

				String worldName = world.getName();
				List<String> oldPerms = allPermissions.getOrDefault(worldName, new ArrayList<>());
				List<String> newPermissions = world.getInformation();
				if (!oldPerms.equals(newPermissions)) {
					user.setPermissions(newPermissions, worldName);
					save = true;
				}
			}
			if (save) {
				user.save();
			}
		}

		for (PermissionUser user : backendUsers) {
			if (!existingUsers.contains(user.getName())) {
				user.remove();
				backend.resetGroup(user.getIdentifier());
			}
		}
		pex.getLogger().log(Level.INFO, "Users received from Dashboard saved.");
	}
}
