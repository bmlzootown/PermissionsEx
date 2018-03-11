package com.djrapitops.permissionsex.backends.web.pages;

import com.djrapitops.permissionsex.backends.PexDashboard;
import com.djrapitops.permissionsex.backends.json.PexJSONService;
import com.djrapitops.permissionsex.backends.web.login.TokenVerifier;
import com.djrapitops.permissionsex.backends.web.pages.rest.*;

/**
 * PageHandler that will handle Rest API end points at /api.
 *
 * @author Rsl1122
 */
public class RestAPIPageHandler extends TreePageHandler {

	public RestAPIPageHandler(PexDashboard pexDashboard) {

		PexJSONService pexJSONService = pexDashboard.getPexJSONService();

		registerPage("users", new UserRestAPI(pexJSONService.getUserJSONService()));
		registerPage("groups", new GroupRestAPI(pexJSONService.getGroupJSONService()));
		registerPage("worlds", new WorldRestAPI(pexJSONService.getWorldJSONService()));
		registerPage("plugins", new PluginRestAPI(pexJSONService.getPluginJSONService()));
		registerPage("login", new LoginRestAPI(new TokenVerifier(), pexDashboard.getPassHashStorage()));
		registerPage("register", new RegisterRestAPI(pexDashboard.getRegisterStore(), pexDashboard.getPassHashStorage()));

	}
}