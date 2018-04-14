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
import ru.tehkode.permissions.PermissionManager;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.lang.reflect.Type;
import java.util.*;
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
			worlds.add(new WorldContainer(entry.getKey(), entry.getValue()));
		}

		List<String> inheritance = permissionGroup.getParentIdentifiers();

		return new GroupContainer(groupName, inheritance, worlds);
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
	public void updateGroups(JsonArray groups) {
		Type type = new TypeToken<List<GroupContainer>>() {
		}.getType();
		List<GroupContainer> groupList = new Gson().fromJson(groups, type);

		PermissionManager backend = pex.getPermissionsManager();
		pex.getLogger().log(Level.INFO, "Begun saving groups received from Dashboard (" + groupList.size() + ")..");

		List<PermissionGroup> backendGroups = backend.getGroupList();
		Map<String, PermissionGroup> backendGroupMap = new HashMap<>();
		for (PermissionGroup backendGroup : backendGroups) {
			backendGroupMap.put(backendGroup.getName(), backendGroup);
		}

		Set<String> existingGroups = new HashSet<>();
		for (GroupContainer groupContainer : groupList) {
			String groupName = groupContainer.getName();
			existingGroups.add(groupName);

			boolean save = false;

			PermissionGroup group = backendGroupMap.get(groupName);
			if (group == null) {
				group = backend.getGroup(groupName);
			}

			Set<String> oldParentNames = getNames(group.getParents());
			List<PermissionGroup> parents = getParents(backend, groupContainer.getInheritance());
			Set<String> newParentNames = new HashSet<>(groupContainer.getInheritance());
			if (!oldParentNames.equals(newParentNames)) {
				group.setParents(parents);
				save = true;
			}

			Map<String, List<String>> allPermissions = group.getAllPermissions();
			List<WorldContainer> worlds = groupContainer.getWorlds();
			for (WorldContainer world : worlds) {
				// World with null name contains general permissions

				String worldName = world.getName();
				List<String> oldPerms = allPermissions.getOrDefault(worldName, new ArrayList<>());
				List<String> newPermissions = world.getInformation();
				if (!oldPerms.equals(newPermissions)) {
					group.setPermissions(newPermissions, worldName);
					save = true;
				}
			}
			if (save) {
				group.save();
			}
		}

		for (PermissionGroup group : backendGroups) {
			if (!existingGroups.contains(group.getName())) {
				group.remove();
				backend.resetGroup(group.getIdentifier());
			}
		}

		pex.getLogger().log(Level.INFO, "Groups received from Dashboard saved.");

	}

	private Set<String> getNames(List<PermissionGroup> parents) {
		Set<String> names = new HashSet<>();
		for (PermissionGroup parent : parents) {
			names.add(parent.getName());
		}
		return names;
	}

	private List<PermissionGroup> getParents(PermissionManager backend, List<String> inheritance) {
		List<PermissionGroup> parents = new ArrayList<>();
		for (String parent : inheritance) {
			parents.add(backend.getGroup(parent));
		}
		return parents;
	}
}
