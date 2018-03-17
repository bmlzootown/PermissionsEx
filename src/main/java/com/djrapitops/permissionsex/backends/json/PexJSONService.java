package com.djrapitops.permissionsex.backends.json;

import com.djrapitops.permissionsex.backends.json.impl.PluginJSONServiceImpl;

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

	public PexJSONService() {
		// TODO Write proper implementation
		DummyJSONService dummy = new DummyJSONService();
		userJSONService = dummy;
		groupJSONService = dummy;
		worldJSONService = dummy;
		pluginJSONService = new PluginJSONServiceImpl();
		backupJSONService = dummy;
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