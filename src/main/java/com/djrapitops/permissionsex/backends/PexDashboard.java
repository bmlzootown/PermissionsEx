package com.djrapitops.permissionsex.backends;

import com.djrapitops.permissionsex.backends.json.DummyJSONService;
import com.djrapitops.permissionsex.backends.json.PexJSONService;
import com.djrapitops.permissionsex.backends.web.WebServer;
import com.djrapitops.permissionsex.backends.web.login.PasswordStorage;
import com.djrapitops.permissionsex.backends.web.login.TokenVerifier;
import com.djrapitops.permissionsex.backends.web.login.YamlPasswordStorage;
import com.djrapitops.permissionsex.exceptions.web.WebServerException;
import org.bukkit.configuration.InvalidConfigurationException;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Central class for initializing the Pex Dashboard.
 *
 * @author Rsl1122
 */
public class PexDashboard {

	private Logger logger;

	private final WebServer webServer;

	private final PexJSONService pexJSONService;
	private PasswordStorage passwordStorage;
	private TokenVerifier tokenVerifier;

	public PexDashboard(PermissionsEx plugin) {
		logger = plugin.getLogger();
		try {
			tokenVerifier = new TokenVerifier();
		} catch (UnsupportedEncodingException e) {
			logger.log(Level.SEVERE, "Failed to load token verifier, WebServer can not function: " + e.getMessage());
		}
		passwordStorage = new YamlPasswordStorage(plugin.getDataFolder());
		pexJSONService = new DummyJSONService(); // TODO Write proper implementation

		webServer = new WebServer(plugin, this);
	}

	public void enable() throws WebServerException, IOException, InvalidConfigurationException {
		if (tokenVerifier == null) {
			return;
		}
		webServer.enable();

		// Create dashboard_users.yml file.
		if (webServer.isEnabled()) {
			logger.log(Level.INFO, "Loading dashboard users..");
			logger.log(Level.INFO, "Loaded " + passwordStorage.loadAndHash() + " users.");
		}
	}

	public void disable() {
		webServer.disable();
	}

	public WebServer getWebServer() {
		return webServer;
	}

	public PasswordStorage getPasswordStorage() {
		return passwordStorage;
	}

	public PexJSONService getPexJSONService() {
		return pexJSONService;
	}

	public TokenVerifier getTokenVerifier() {
		return tokenVerifier;
	}
}