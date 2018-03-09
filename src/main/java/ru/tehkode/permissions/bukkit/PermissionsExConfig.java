package ru.tehkode.permissions.bukkit;

import org.bukkit.configuration.Configuration;
import org.bukkit.configuration.ConfigurationSection;
import ru.tehkode.permissions.backends.PermissionBackend;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @author zml2008
 */
public class PermissionsExConfig {
	private final Configuration config;
	private final PermissionsEx plugin;

	private final boolean useNetEvents;
	private final boolean debug;
	private final boolean allowOps;
	private final boolean userAddGroupsLast;
	private final boolean logPlayers;
	private final boolean createUserRecords;
	private final String defaultBackend;
	private final boolean updaterEnabled;
	private final boolean alwaysUpdate;
	private final boolean informPlayers;
	private final List<String> serverTags;
	private final String basedir;

	// Config settings for WebServer
	private final boolean dashboardEnabled;
	private final int dashboardPort;
	private final String dashboardAddress;
	private final String dashboardCertPath;
	private final String dashboardCertKeyPass;
	private final String dashboardCertStorePass;
	private final String dashboardCertAlias;
	private final String dashboardInternalIP;

	public PermissionsExConfig(Configuration config, PermissionsEx plugin) {
		this.config = config;
		this.plugin = plugin;

		useNetEvents = getBoolean("multiserver.use-netevents", true);
		serverTags = getStringList("multiserver.server-tags");
		debug = getBoolean("permissions.debug", false);
		allowOps = getBoolean("permissions.allowOps", false);
		userAddGroupsLast = getBoolean("permissions.user-add-groups-last", false);
		logPlayers = getBoolean("permissions.log-players", false);
		createUserRecords = getBoolean("permissions.createUserRecords", false);
		defaultBackend = getString("permissions.backend", PermissionBackend.DEFAULT_BACKEND);
		updaterEnabled = getBoolean("updater", true);
		alwaysUpdate = getBoolean("alwaysUpdate", false);
		informPlayers = getBoolean("permissions.informplayers.changes", false);
		basedir = getString("permissions.basedir", "plugins/PermissionsEx");

		dashboardEnabled = getBoolean("permissions.dashboard.enabled", false);
		dashboardPort = getInt("permissions.dashboard.port", 5950);
		String serverIP = plugin.getServer().getIp();
		dashboardAddress = getString("permissions.dashboard.serveraddress", serverIP.isEmpty() ? "localhost" : serverIP + ":PORT");
		dashboardCertPath = getString("permissions.dashboard.certificate.path", "Cert.jks");
		dashboardCertKeyPass = getString("permissions.dashboard.certificate.keypass", "passwordToKey");
		dashboardCertStorePass = getString("permissions.dashboard.certificate.storepass", "passwordToStore");
		dashboardCertAlias = getString("permissions.dashboard.certificate.alias", "storeAlias");
		dashboardInternalIP = getString("permissions.dashboard.internalip", "0.0.0.0");
	}

	private boolean getBoolean(String key, boolean def) {
		if (!config.isSet(key)) {
			config.set(key, def);
		}
		return config.getBoolean(key, def);
	}

	private int getInt(String key, int def) {
		if (!config.isSet(key)) {
			config.set(key, def);
		}
		return config.getInt(key, def);
	}

	private String getString(String key, String def) {
		String ret = config.getString(key);
		if (ret == null) {
			ret = def;
			config.set(key, ret);
		}
		return ret;
	}

	private List<String> getStringList(String key, String... def) {
		List<String> ret = config.getStringList(key);
		if (ret == null) {
			ret = Arrays.asList(def);
			config.set(key, ret);
		}
		return Collections.unmodifiableList(ret);
	}

	public boolean useNetEvents() {
		return useNetEvents;
	}

	public boolean isDebug() {
		return debug;
	}

	public boolean allowOps() {
		return allowOps;
	}

	public boolean userAddGroupsLast() {
		return userAddGroupsLast;
	}

	public String getDefaultBackend() {
		return defaultBackend;
	}

	public boolean shouldLogPlayers() {
		return logPlayers;
	}

	public boolean createUserRecords() {
		return createUserRecords;
	}

	public boolean updaterEnabled() {
		return updaterEnabled;
	}

	public boolean alwaysUpdate() {
		return alwaysUpdate;
	}

	public boolean informPlayers() {
		return informPlayers;
	}

	public boolean isDashboardEnabled() {
		return dashboardEnabled;
	}

	public int getDashboardPort() {
		return dashboardPort;
	}

	public String getDashboardCertPath() {
		return dashboardCertPath;
	}

	public String getDashboardCertKeyPass() {
		return dashboardCertKeyPass;
	}

	public String getDashboardCertStorePass() {
		return dashboardCertStorePass;
	}

	public String getDashboardCertAlias() {
		return dashboardCertAlias;
	}

	public String getDashboardInternalIP() {
		return dashboardInternalIP;
	}

	public String getDashboardAddress() {
		return dashboardAddress;
	}

	public List<String> getServerTags() {
		return serverTags;
	}

	public String getBasedir() {
		return basedir;
	}

	public ConfigurationSection getBackendConfig(String backend) {
		ConfigurationSection section = config.getConfigurationSection("permissions.backends." + backend);
		if (section == null) {
			section = config.createSection("permissions.backends." + backend);
		}
		return section;
	}

	public void save() {
		plugin.saveConfig();
	}
}
