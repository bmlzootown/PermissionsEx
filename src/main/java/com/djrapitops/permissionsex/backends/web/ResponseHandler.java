package com.djrapitops.permissionsex.backends.web;

import com.djrapitops.permissionsex.backends.PexDashboard;
import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.responses.ByteResponse;
import com.djrapitops.permissionsex.backends.web.http.responses.FileResponse;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonErrorResponse;
import com.djrapitops.permissionsex.backends.web.pages.RestAPIPageHandler;
import com.djrapitops.permissionsex.backends.web.pages.TreePageHandler;
import com.google.gson.JsonSyntaxException;

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
		try {
			Response response = super.getResponse(request, target);

			if (response == null) {
				response = attemptToFind(targetString);
			}

			// index.html (FrontEnd) handles pages that do not exist.
			return response != null ? response : new FileResponse("text/html", "web/index.html");
		} catch (IllegalArgumentException | IllegalStateException e) {
			return new JsonErrorResponse(e.getMessage(), 500);
		} catch (JsonSyntaxException e) {
			return new JsonErrorResponse(e.getMessage(), 400);
		}
	}

	private Response attemptToFind(String targetString) {
		if (targetString.isEmpty() || "/".equals(targetString)) {
			return null;
		}
		// Handles relative script and style loading

		boolean isCss = targetString.endsWith(".css");
		boolean isJs = targetString.endsWith(".js");
		boolean isJson = targetString.endsWith(".json");
		boolean isSourceMap = targetString.endsWith(".map");
		boolean isImage = targetString.endsWith(".png");

		boolean isEot = targetString.endsWith(".eot");
		boolean isWoff = targetString.endsWith(".woff");
		boolean isWoff2 = targetString.endsWith(".woff2");
		boolean isTtf = targetString.endsWith(".ttf");
		boolean isSvg = targetString.endsWith(".svg");

		if (isCss) {
			return new FileResponse("text/css", "web" + targetString);
		} else if (isJs) {
			return new FileResponse("text/javascript", "web" + targetString);
		} else if (isJson || isSourceMap) {
			return new FileResponse("application/json", "web" + targetString);
		} else if (isImage) {
			return new ByteResponse("image/gif", "web" + targetString);
		} else if (isEot) {
			return new ByteResponse("application/vnd.ms-fontobject", "web" + targetString, false);
		} else if (isTtf) {
			return new ByteResponse("application/font-sfnt", "web" + targetString, false);
		} else if (isSvg) {
			return new ByteResponse("image/svg+xml", "web" + targetString, false);
		} else if (isWoff) {
			return new ByteResponse("application/font-woff", "web" + targetString, false);
		} else if (isWoff2) {
			return new ByteResponse("font/woff2", "web" + targetString, false);
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