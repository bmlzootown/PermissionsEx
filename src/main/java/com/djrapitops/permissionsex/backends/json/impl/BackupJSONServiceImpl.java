package com.djrapitops.permissionsex.backends.json.impl;

import com.djrapitops.permissionsex.backends.json.BackupJSONService;
import com.djrapitops.permissionsex.backends.json.obj.BackupContainer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;

/**
 * Dummmy to use until proper implementations.
 *
 * @author Rsl1122
 */
public class BackupJSONServiceImpl implements BackupJSONService {

	private final PermissionsEx plugin;

	public BackupJSONServiceImpl(PermissionsEx plugin) {
		this.plugin = plugin;
	}

	@Override
	public JsonArray getBackupInformation() {
		plugin.getLogger().log(Level.INFO,
				getClass().getSimpleName() + " got request to get all backups but no implementation was present.");

		List<BackupContainer> backups = new ArrayList<>(); // TODO Implement (Add existing backups)

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<List<BackupContainer>>() {
		}.getType();
		String json = gson.toJson(backups, type);

		return gson.fromJson(json, JsonArray.class);
	}

	@Override
	public JsonObject createBackup(String name) {
		plugin.getLogger().log(Level.INFO,
				getClass().getSimpleName() + " got request to get create a backup but no implementation was present.");

		// TODO Implement (Create a new backup and return object)
		BackupContainer backup = new BackupContainer(name + " (Not in backend!)", System.currentTimeMillis());

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<BackupContainer>() {
		}.getType();
		String json = gson.toJson(backup, type);

		return gson.fromJson(json, JsonObject.class);
	}

	@Override
	public void deleteBackup(String name) throws IllegalArgumentException {
		plugin.getLogger().log(Level.INFO,
				getClass().getSimpleName() + " got request to get delete a backup but no implementation was present.");

		// TODO Implement (Delete a backup)
	}

	@Override
	public JsonObject duplicateBackup(String name) throws IllegalArgumentException {
		plugin.getLogger().log(Level.INFO,
				getClass().getSimpleName() + " got request to get duplicate a backup but but no implementation was present.");

		// TODO Implement (Duplicate a backup and return new object)
		BackupContainer backup = new BackupContainer(name + "_copy (Not in backend!)", System.currentTimeMillis());

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<BackupContainer>() {
		}.getType();
		String json = gson.toJson(backup, type);

		return gson.fromJson(json, JsonObject.class);
	}

	@Override
	public void restoreBackup(String name) throws IllegalArgumentException {
		plugin.getLogger().log(Level.INFO,
				getClass().getSimpleName() + " got request to get restore a backup but no implementation was present.");

		// TODO Implement (Restore a backup)
	}
}