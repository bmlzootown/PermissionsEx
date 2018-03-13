package com.djrapitops.permissionsex.backends.web.http.responses;

/**
 * Json based error response.
 *
 * @author Rsl1122
 */
public class JsonErrorResponse extends JsonResponse {

	public JsonErrorResponse(String errorMsg, int httpStatusCode) {
		super("{\"error\", \"" + errorMsg + "\"}", httpStatusCode);
	}

}