package com.djrapitops.permissionsex.backends.json.impl;

import com.djrapitops.permissionsex.backends.json.GroupJSONService;
import com.djrapitops.permissionsex.backends.json.obj.GroupContainer;
import com.djrapitops.permissionsex.backends.json.obj.WorldContainer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import ru.tehkode.permissions.PermissionGroup;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;

public class GroupJSONServiceImpl implements GroupJSONService {

	private final PermissionsEx pex;

	public GroupJSONServiceImpl(PermissionsEx pex) {
		this.pex = pex;
	}

	@Override
	public JsonArray getAllGroups() {
		List<GroupContainer> groupContainers = new ArrayList<>();

		for (PermissionGroup permissionGroup : pex.getPermissionsManager().getGroupList()) {
			GroupContainer group = getGroup(permissionGroup);

			groupContainers.add(group);
		}

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<List<GroupContainer>>() {
		}.getType();
		String json = gson.toJson(groupContainers, type);

		return gson.fromJson(json, JsonArray.class);
	}

	private GroupContainer getGroup(PermissionGroup permissionGroup) {
		String groupName = permissionGroup.getName();
		Map<String, List<String>> allPermissions = permissionGroup.getAllPermissions();
		List<WorldContainer> worlds = new ArrayList<>();
		for (Map.Entry<String, List<String>> entry : allPermissions.entrySet()) {
			if ("".equals(entry.getKey())) {
				continue;
			}
			worlds.add(new WorldContainer(entry.getKey(), entry.getValue()));
		}

		List<String> permissions = allPermissions.get("");
		List<String> inheritance = permissionGroup.getParentIdentifiers();

		return new GroupContainer(groupName, inheritance, permissions, worlds);
	}

	@Override
	public JsonObject getGroup(String groupName) throws IllegalArgumentException {
		PermissionGroup permissionGroup = pex.getPermissionsManager().getGroup(groupName);
		if (permissionGroup == null) {
			throw new IllegalArgumentException(groupName + " not found.");
		}

		GroupContainer group = getGroup(permissionGroup);

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<GroupContainer>() {
		}.getType();
		String json = gson.toJson(group, type);

		return gson.fromJson(json, JsonObject.class);
	}

	@Override
	public void updateGroups(JsonArray worlds) {
		pex.getLogger().log(Level.INFO, GroupJSONService.class.getSimpleName() +
				" got request to save config but no implementation was present.");
	}
}
