package com.djrapitops.permissionsex.backends.web;

import ru.tehkode.permissions.bukkit.PermissionsExConfig;

/**
 * Settings for the Dashboard.
 *
 * @author Rsl1122
 */
public class DashboardSettings {

	private final boolean enabled;
	private final int port;
	private final String certPath;
	private final String certKeyPass;
	private final String certStorePass;
	private final String certAlias;
	private final String webserverAddress;
	private final String internalIP;

	DashboardSettings(PermissionsExConfig config) {
		enabled = config.isDashboardEnabled();
		port = config.getDashboardPort();
		certPath = config.getDashboardCertPath();
		certKeyPass = config.getDashboardCertKeyPass();
		certStorePass = config.getDashboardCertStorePass();
		certAlias = config.getDashboardCertAlias();
		webserverAddress = config.getDashboardAddress();
		internalIP = config.getDashboardInternalIP();
	}

	public boolean isWebServerEnabled() {
		return enabled;
	}

	public int getPort() {
		return port;
	}

	public String getCertPath() {
		return certPath;
	}

	public String getCertKeyPass() {
		return certKeyPass;
	}

	public String getCertStorePass() {
		return certStorePass;
	}

	public String getCertAlias() {
		return certAlias;
	}

	public String getInternalIP() {
		return internalIP;
	}

	public String getWebserverAddress() {
		return webserverAddress;
	}
}