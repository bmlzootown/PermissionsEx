package com.djrapitops.permissionsex.backends.json.impl;

import com.djrapitops.permissionsex.backends.json.PluginJSONService;
import com.djrapitops.permissionsex.backends.json.obj.PluginContainer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import org.bukkit.plugin.Plugin;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class PluginJSONServiceImpl implements PluginJSONService {

	@Override
	public JsonArray getAllPlugins() {
		List<PluginContainer> pluginContainers = new ArrayList<>();

		for (Plugin plugin : PermissionsEx.getPlugin().getServer().getPluginManager().getPlugins()) {
			pluginContainers.add(new PluginContainer(plugin.getName(), plugin.getDescription().getPermissions()));
		}

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<List<PluginContainer>>() {
		}.getType();
		String json = gson.toJson(pluginContainers, type);

		return gson.fromJson(json, JsonArray.class);
	}

	@Override
	public JsonObject getPlugin(String pluginName) throws IllegalArgumentException {
		Plugin plugin = PermissionsEx.getPlugin().getServer().getPluginManager().getPlugin(pluginName);
		if (plugin == null) {
			throw new IllegalArgumentException(pluginName + " not found.");
		}

		PluginContainer pluginContainer = new PluginContainer(plugin.getName(), plugin.getDescription().getPermissions());

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<PluginContainer>() {
		}.getType();
		String json = gson.toJson(pluginContainer, type);

		return gson.fromJson(json, JsonObject.class);
	}
}
