package com.djrapitops.permissionsex.backends.json.impl;

import com.djrapitops.permissionsex.backends.json.BackupJSONService;
import com.djrapitops.permissionsex.backends.json.obj.BackupContainer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import ru.tehkode.permissions.backends.PermissionBackend;
import ru.tehkode.permissions.backends.file.FileBackend;
import ru.tehkode.permissions.bukkit.PermissionsEx;
import ru.tehkode.permissions.exceptions.PermissionBackendException;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Files;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * BackupJSONService implementation.
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

		List<BackupContainer> backups = new ArrayList<>();
		for (File file : Objects.requireNonNull(plugin.getDataFolder().listFiles())) {
			String fileName = file.getName();
			if (fileName.startsWith("Backup-")) {
				backups.add(new BackupContainer(fileName, getTime(file)));
			}
		}

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<List<BackupContainer>>() {
		}.getType();
		String json = gson.toJson(backups, type);

		return gson.fromJson(json, JsonArray.class);
	}

	@Override
	public JsonObject createBackup(String name) {
		BackupContainer backup = createNewBackup(name);

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<BackupContainer>() {
		}.getType();
		String json = gson.toJson(backup, type);

		return gson.fromJson(json, JsonObject.class);
	}

	private BackupContainer createNewBackup(String name) {
		PermissionBackend currentBackend = plugin.getPermissionsManager().getBackend();

		long creationTime = System.currentTimeMillis();
		String time = new SimpleDateFormat("yyyy_MM_dd-HH_mm").format(creationTime);
		String backupName = "Backup-" + name.replace("-", "") + "-" + time + ".bak";
		try {
			FileBackend backup = new FileBackend(plugin.getPermissionsManager(), plugin.getConfig(), backupName);
			backup.loadFrom(currentBackend);
			backup.save();
			return new BackupContainer(backupName, creationTime);
		} catch (PermissionBackendException e) {
			throw new IllegalStateException("Invalid backup name: " + name);
		}
	}

	@Override
	public void deleteBackup(String name) throws IllegalArgumentException {
		try {
			File backupFile = getBackupFile(name);
			Files.delete(backupFile.toPath());
		} catch (IOException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
	}

	private File getBackupFile(String name) throws FileNotFoundException {
		File dataFolder = plugin.getDataFolder();
		for (File file : Objects.requireNonNull(dataFolder.listFiles())) {
			if (file.getName().equals(name)) {
				return file;
			}
		}
		throw new FileNotFoundException();
	}

	@Override
	public JsonObject duplicateBackup(String name) throws IllegalArgumentException {
		BackupContainer backup = createDuplicateBackup(name);

		Gson gson = new GsonBuilder().create();
		Type type = new TypeToken<BackupContainer>() {
		}.getType();
		String json = gson.toJson(backup, type);

		return gson.fromJson(json, JsonObject.class);
	}

	private BackupContainer createDuplicateBackup(String name) {
		try {
			File backupFile = getBackupFile(name);
			String copyName = backupFile.getName().replace(".bak", "_copy.bak");
			BackupContainer backupContainer = new BackupContainer(copyName, getTime(backupFile));

			Files.copy(
					backupFile.toPath(),
					new File(backupFile.getParentFile(), copyName).toPath()
			);
			return backupContainer;

		} catch (IOException e) {
			throw new IllegalArgumentException(e.getMessage());
		}
	}

	private long getTime(File backupFile) {
		String name = backupFile.getName();
		String[] split = name.split("-", 3);
		if (split.length < 3) {
			throw new IllegalArgumentException("Invalid name format: " + backupFile);
		}
		String timeStamp = split[2].replace(".bak", "");
		try {
			return new SimpleDateFormat("yyyy_MM_dd-HH_mm").parse(timeStamp).getTime();
		} catch (ParseException e) {
			throw new IllegalArgumentException("Invalid name format: " + backupFile);
		}
	}

	@Override
	public void restoreBackup(String name) throws IllegalArgumentException {
		PermissionBackend currentBackend = plugin.getPermissionsManager().getBackend();

		try {
			File backupFile = new File(plugin.getDataFolder(), name);
			if (!backupFile.exists()) {
				throw new IllegalArgumentException("Backup didn't exist!");
			}

			FileBackend backup = new FileBackend(plugin.getPermissionsManager(), plugin.getConfig(), name);
			currentBackend.loadFrom(backup);
			currentBackend.reload();
		} catch (PermissionBackendException e) {
			throw new IllegalStateException("Invalid backup name: " + name);
		}
	}
}