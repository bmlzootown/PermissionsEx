package com.djrapitops.permissionsex.backends.web;

import com.djrapitops.permissionsex.backends.PexDashboard;
import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.responses.FileResponse;
import com.djrapitops.permissionsex.backends.web.pages.RestAPIPageHandler;
import com.djrapitops.permissionsex.backends.web.pages.TreePageHandler;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Handler in charge of selecting a Response for each Request.
 *
 * @author Rsl1122
 */
public class ResponseHandler extends TreePageHandler {

	public ResponseHandler(PexDashboard pexDashboard) {
		registerPages(pexDashboard);
	}

	private void registerPages(PexDashboard pexDashboard) {
		registerPage("api", new RestAPIPageHandler(pexDashboard));
	}

	public Response getResponse(Request request) {
		String targetString = request.getTarget();
		List<String> target = getTarget(targetString);

		return getResponse(request, target, targetString);
	}

	public Response getResponse(Request request, List<String> target, String targetString) {
		Response response = super.getResponse(request, target);

		if (response == null) {
			response = attemptToFind(targetString);
		}

		// index.html (FrontEnd) handles pages that do not exist.
		return response != null ? response : new FileResponse("text/html", "web/index.html");
	}

	private Response attemptToFind(String targetString) {
		if (targetString.isEmpty() || "/".equals(targetString)) {
			return null;
		}
		// Handles relative script and style loading

		boolean isCss = targetString.endsWith(".css");
		boolean isJs = targetString.endsWith(".js");
		boolean isJson = targetString.endsWith(".json");

		if (isCss) {
			return new FileResponse("text/css", "web" + targetString);
		} else if (isJs) {
			return new FileResponse("text/javascript", "web" + targetString);
		} else if (isJson) {
			return new FileResponse("application/json", "web" + targetString);
		}

		// In this case the target is not a relative file that needs to be loaded from a static location.
		return null;
	}

	private List<String> getTarget(String targetString) {
		List<String> target = new ArrayList<>(Arrays.asList(targetString.split("/")));
		if (!target.isEmpty()) {
			target.remove(0);
		}
		return target;
	}
}