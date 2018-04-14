package com.djrapitops.permissionsex.backends.json;

import com.djrapitops.permissionsex.backends.json.impl.*;
import ru.tehkode.permissions.bukkit.PermissionsEx;

/**
 * Class that facilitates all JSON conversion coming from and going to the RestAPIs.
 *
 * @author Rsl1122
 */
public class PexJSONService {

	private UserJSONService userJSONService;
	private GroupJSONService groupJSONService;
	private WorldJSONService worldJSONService;
	private PluginJSONService pluginJSONService;
	private BackupJSONService backupJSONService;

	public PexJSONService(PermissionsEx plugin) {
		userJSONService = new UserJSONServiceImpl(plugin);
		groupJSONService = new GroupJSONServiceImpl(plugin);
		worldJSONService = new WorldJSONServiceImpl(plugin);
		pluginJSONService = new PluginJSONServiceImpl(plugin);
		backupJSONService = new BackupJSONServiceImpl(plugin);
	}

	public UserJSONService getUserJSONService() {
		return userJSONService;
	}

	public GroupJSONService getGroupJSONService() {
		return groupJSONService;
	}

	public WorldJSONService getWorldJSONService() {
		return worldJSONService;
	}

	public PluginJSONService getPluginJSONService() {
		return pluginJSONService;
	}

	public BackupJSONService getBackupJSONService() {
		return backupJSONService;
	}
}