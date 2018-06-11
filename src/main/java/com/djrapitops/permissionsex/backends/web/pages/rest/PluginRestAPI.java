package com.djrapitops.permissionsex.backends.web.pages.rest;

import com.djrapitops.permissionsex.backends.json.PluginJSONService;
import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonErrorResponse;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonResponse;
import com.djrapitops.permissionsex.backends.web.pages.PageHandler;
import com.djrapitops.permissionsex.backends.web.pages.RestAPIHandler;

import java.util.List;

/**
 * RestAPI endpoint for /api/plugins.
 *
 * @author Rsl1122
 */
public class PluginRestAPI extends RestAPIHandler {

	private final PluginJSONService pluginJSONService;

	public PluginRestAPI(PluginJSONService pluginJSONService) {
		this.pluginJSONService = pluginJSONService;

		registerAPIEndPoints();
	}

	private void registerAPIEndPoints() {
		registerPage("", new PageHandler() {
			@Override
			public Response getResponse(Request request, List<String> target) {
				String requestMethod = request.getRequestMethod();
				if ("GET".equals(requestMethod)) {
					// GET /api/plugins/ - provides all plugins as an array
					return new JsonResponse(pluginJSONService.getAllPlugins(), 200);
				}
				return null;
			}
		});
	}

	@Override
	public Response getResponse(Request request, List<String> target) {
		Response errorResponse = checkAuthValidity(request);
		if (errorResponse != null) {
			return errorResponse;
		}

		PageHandler pageHandler = getPageHandler(target);
		if (pageHandler != null) {
			Response response = pageHandler.getResponse(request, target);
			if (response != null) {
				return response;
			}
		}

		if ("GET".equals(request.getRequestMethod())) {
			// GET /api/plugins/:name - provides a plugin
			try {
				String pluginName = target.get(0).replace("%20", " ");
				return new JsonResponse(pluginJSONService.getPlugin(pluginName));
			} catch (IllegalArgumentException e) {
				return new JsonErrorResponse("Invalid Plugin Name: " + e.getMessage(), 400);
			}
		}

		return new JsonErrorResponse("API endpoint not found", 404);
	}
}