package com.djrapitops.permissionsex.backends.web;

import com.djrapitops.permissionsex.backends.json.DummyJSONService;
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

	ResponseHandler() {
		registerPages();
	}

	private void registerPages() {
		registerPage("api", new RestAPIPageHandler(new DummyJSONService()));
	}

	public Response getResponse(Request request) {
		List<String> target = getTarget(request);

		return getResponse(request, target);
	}

	@Override
	public Response getResponse(Request request, List<String> target) {
		// TODO Handle relative script and style loading
		// css and js should load always.
		// manifest.json & favicon ico as well
		Response response = super.getResponse(request, target);

		// index.html (FrontEnd) handles pages that do not exist.
		return response != null ? response : new FileResponse("text/html", "web/index.html");
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