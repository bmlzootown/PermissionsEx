package com.djrapitops.permissionsex.backends.web.pages;

import com.djrapitops.permissionsex.backends.json.PexJSONService;
import com.djrapitops.permissionsex.backends.web.pages.rest.GroupRestAPI;
import com.djrapitops.permissionsex.backends.web.pages.rest.PluginRestAPI;
import com.djrapitops.permissionsex.backends.web.pages.rest.UserRestAPI;
import com.djrapitops.permissionsex.backends.web.pages.rest.WorldRestAPI;

/**
 * PageHandler that will handle Rest API end points at /api.
 *
 * @author Rsl1122
 */
public class RestAPIPageHandler extends TreePageHandler {

    public RestAPIPageHandler(PexJSONService pexJSONService) {

        registerPage("users", new UserRestAPI(pexJSONService.getUserJSONService()));
        registerPage("groups", new GroupRestAPI(pexJSONService.getGroupJSONService()));
        registerPage("worlds", new WorldRestAPI(pexJSONService.getWorldJSONService()));
        registerPage("plugins", new PluginRestAPI(pexJSONService.getPluginJSONService()));

        // TODO Register APIs login
    }
}