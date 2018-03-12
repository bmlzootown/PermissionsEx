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
		List<String> target = getTarget(request);

		return getResponse(request, target);
	}

	@Override
	public Response getResponse(Request request, List<String> target) {
		Response response = super.getResponse(request, target);

		if (response == null) {
			response = attemptToFind(target);
		}

		// index.html (FrontEnd) handles pages that do not exist.
		return response != null ? response : new FileResponse("text/html", "web/index.html");
	}

	private Response attemptToFind(List<String> target) {
		// Handles relative script and style loading

		String finalTarget = target.get(target.size() - 1);
		boolean isCss = finalTarget.endsWith(".css");
		boolean isJs = finalTarget.endsWith(".js");
		boolean isJson = finalTarget.endsWith(".json");

		if (isCss) {
			return new FileResponse("text/css", "/web/" + finalTarget);
		} else if (isJs) {
			return new FileResponse("text/javascript", "/web/" + finalTarget);
		} else if (isJson) {
			return new FileResponse("application/json", "/web/" + finalTarget);
		}

		// In this case the target is not a relative file that needs to be loaded from a static location.
		return null;
	}

	private List<String> getTarget(Request request) {
		String targetString = request.getTarget();
		List<String> target = new ArrayList<>(Arrays.asList(targetString.split("/")));
		if (!target.isEmpty()) {
			target.remove(0);
		}
		return target;
	}
}