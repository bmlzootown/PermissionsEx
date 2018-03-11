package com.djrapitops.permissionsex.backends;

import com.djrapitops.permissionsex.backends.json.DummyJSONService;
import com.djrapitops.permissionsex.backends.json.PexJSONService;
import com.djrapitops.permissionsex.backends.web.WebServer;
import com.djrapitops.permissionsex.backends.web.login.PassHashStorage;
import com.djrapitops.permissionsex.backends.web.login.RegisterStore;
import com.djrapitops.permissionsex.exceptions.web.WebServerException;
import ru.tehkode.permissions.bukkit.PermissionsEx;

/**
 * Central class for initializing the Pex Dashboard.
 *
 * @author Rsl1122
 */
public class PexDashboard {

	private final WebServer webServer;

	private final PexJSONService pexJSONService;
	private final RegisterStore registerStore;
	private PassHashStorage passHashStorage; // TODO Write implementation

	public PexDashboard(PermissionsEx plugin) {
		webServer = new WebServer(plugin, this);
		pexJSONService = new DummyJSONService(); // TODO Write proper implementation
		registerStore = new RegisterStore(passHashStorage);
	}

	public void enable() throws WebServerException {
		webServer.enable();
	}

	public void disable() {
		webServer.disable();
	}

	public WebServer getWebServer() {
		return webServer;
	}

	public PassHashStorage getPassHashStorage() {
		return passHashStorage;
	}

	public RegisterStore getRegisterStore() {
		return registerStore;
	}

	public PexJSONService getPexJSONService() {
		return pexJSONService;
	}
}