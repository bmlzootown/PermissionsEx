package com.djrapitops.permissionsex.backends.json.impl;

import com.djrapitops.permissionsex.backends.json.WorldJSONService;
import com.djrapitops.permissionsex.backends.json.obj.WorldContainer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import ru.tehkode.permissions.backends.PermissionBackend;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class WorldJSONServiceImpl implements WorldJSONService {

	private final PermissionsEx pex;

	public WorldJSONServiceImpl(PermissionsEx pex) {
		this.pex = pex;
	}

	@Override
	public JsonArray getAllWorlds() {
		List<WorldContainer> worldContainers = new ArrayList<>();

		for (Map.Entry<String, List<String>> entry : pex.getPermissionsManager().getBackend().getAllWorldInheritance().entrySet()) {
			worldContainers.add(new WorldContainer(entry.getKey(), entry.getValue()));
		}

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<List<WorldContainer>>() {
		}.getType();
		String json = gson.toJson(worldContainers, type);

		return gson.fromJson(json, JsonArray.class);
	}

	@Override
	public JsonObject getWorld(String worldName) throws IllegalArgumentException {
		List<String> inheritance = pex.getPermissionsManager().getWorldInheritance(worldName);

		WorldContainer worldContainer = new WorldContainer(worldName, inheritance);

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<WorldContainer>() {
		}.getType();
		String json = gson.toJson(worldContainer, type);

		return gson.fromJson(json, JsonObject.class);
	}

	@Override
	public void updateWorlds(JsonArray worlds) {
		Type type = new TypeToken<List<WorldContainer>>() {
		}.getType();
		List<WorldContainer> worldsList = new Gson().fromJson(worlds, type);

		PermissionBackend backend = pex.getPermissionsManager().getBackend();
		for (WorldContainer world : worldsList) {
			backend.setWorldInheritance(world.getName(), world.getInformation());
		}
	}
}
