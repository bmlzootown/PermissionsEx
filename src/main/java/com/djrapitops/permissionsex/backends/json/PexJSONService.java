package com.djrapitops.permissionsex.backends.json;

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
}