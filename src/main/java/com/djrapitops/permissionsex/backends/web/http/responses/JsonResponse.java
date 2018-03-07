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

    public JsonResponse(JsonElement json, int httpStatusCode) {
        super("application/json");
        super.setHeader("HTTP/1.1 " + httpStatusCode);
        content = json.toString();
    }

    public JsonResponse(JsonElement json) {
        this(json, 200);
    }

    @Override
    protected String getContent() {
        return content;
    }
}