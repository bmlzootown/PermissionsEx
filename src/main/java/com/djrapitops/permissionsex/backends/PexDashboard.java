package com.djrapitops.permissionsex.backends;

import com.djrapitops.permissionsex.backends.json.DummyJSONService;
import com.djrapitops.permissionsex.backends.json.PexJSONService;
import com.djrapitops.permissionsex.backends.web.WebServer;
import com.djrapitops.permissionsex.backends.web.login.PasswordStorage;
import com.djrapitops.permissionsex.backends.web.login.YamlPasswordStorage;
import com.djrapitops.permissionsex.exceptions.web.WebServerException;
import org.bukkit.configuration.InvalidConfigurationException;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.io.IOException;

/**
 * Central class for initializing the Pex Dashboard.
 *
 * @author Rsl1122
 */
public class PexDashboard {

	private final WebServer webServer;

	private final PexJSONService pexJSONService;
	private PasswordStorage passwordStorage;

	public PexDashboard(PermissionsEx plugin) {
		webServer = new WebServer(plugin, this);
		passwordStorage = new YamlPasswordStorage(plugin.getDataFolder());
		pexJSONService = new DummyJSONService(); // TODO Write proper implementation
	}

	public void enable() throws WebServerException, IOException, InvalidConfigurationException {
		webServer.enable();

		// Create dashboard_users.yml file.
		if (webServer.isEnabled()) {
			if (passwordStorage instanceof YamlPasswordStorage) {
				YamlPasswordStorage passwordStorage = (YamlPasswordStorage) this.passwordStorage;
				passwordStorage.createEmptyFile();
				passwordStorage.load();
			}
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
}