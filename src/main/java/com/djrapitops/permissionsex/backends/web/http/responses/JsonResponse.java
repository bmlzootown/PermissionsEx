package com.djrapitops.permissionsex.backends.web.http.responses;

import com.djrapitops.permissionsex.backends.web.http.Response;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 * JSON response for different responses to the Frontend.
 *
 * @author Rsl1122
 */
public class JsonResponse extends Response {

	private final String content;

	public JsonResponse(String jsonString, int httpStatusCode) {
		super("application/json");
		super.setHeader("HTTP/1.1 " + httpStatusCode);
		content = jsonString;
	}

	public JsonResponse(JsonArray jsonArray, int httpStatusCode) {
		super("application/json");
		super.setHeader("HTTP/1.1 " + httpStatusCode);

		JsonObject json = new JsonObject();
		json.add("list", jsonArray);

		content = json.toString();
	}

	public JsonResponse(JsonObject json, int httpStatusCode) {
		this(json.toString(), httpStatusCode);
	}

	public JsonResponse(JsonObject json) {
		this(json, 200);
	}

	@Override
	protected String getContent() {
		return content;
	}
}