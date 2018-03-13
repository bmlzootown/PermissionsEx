package com.djrapitops.permissionsex.backends.web.pages;

import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.auth.Authentication;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonErrorResponse;
import com.djrapitops.permissionsex.exceptions.ParseException;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;

/**
 * Abstract TreePageHandler for all RestAPI providers.
 * <p>
 * Contains utility methods.
 *
 * @author Rsl1122
 */
public abstract class RestAPIHandler extends TreePageHandler {

	protected Response checkAuthValidity(Request request) {
		if (!request.hasAuth()) {
			return new JsonErrorResponse("Authorization not provided", 401);
		}
		Authentication auth = request.getAuth();
		if (!auth.isValid()) {
			return new JsonErrorResponse("Expired user token, please log-in again.", 400);
		}
		return null;
	}

	@Deprecated
	protected String getStringFromRequestBody(Request request) throws ParseException {
		return request.getRequestBodyString();
	}

	/**
	 * Parses JSON String into a JsonElement.
	 * <p>
	 * https://stackoverflow.com/a/15116323
	 *
	 * @param json String format of JSON.
	 * @return parsed JsonElement
	 */
	protected JsonElement parseJSONFromString(String json) {
		return new GsonBuilder().setPrettyPrinting().create().fromJson(json, JsonElement.class);
	}

}