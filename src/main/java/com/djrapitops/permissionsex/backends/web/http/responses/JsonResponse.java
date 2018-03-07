package com.djrapitops.permissionsex.backends.web.http.responses;

import com.djrapitops.permissionsex.backends.web.http.Response;
import com.google.gson.JsonElement;

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

    public JsonResponse(JsonElement json, int httpStatusCode) {
        this(json.toString(), httpStatusCode);
    }

    public JsonResponse(JsonElement json) {
        this(json, 200);
    }

    @Override
    protected String getContent() {
        return content;
    }
}