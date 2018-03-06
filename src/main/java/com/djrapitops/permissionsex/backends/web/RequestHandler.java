package com.djrapitops.permissionsex.backends.web;

import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.auth.Authentication;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.util.List;

/**
 * Turns HttpExchange into Request that is passed onwards, and sends the Request it receives.
 *
 * @author Rsl1122
 */
public class RequestHandler implements HttpHandler {

    private final ResponseHandler responseHandler;

    RequestHandler(ResponseHandler responseHandler) {
        this.responseHandler = responseHandler;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        Headers requestHeaders = exchange.getRequestHeaders();
        Headers responseHeaders = exchange.getResponseHeaders();

        Request request = new Request(exchange);
        request.setAuth(getAuthorization(requestHeaders));

        try {
            Response response = responseHandler.getResponse(request);
            response.send(exchange, responseHeaders);
        } finally {
            exchange.close();
        }
    }

    private Authentication getAuthorization(Headers requestHeaders) {
        List<String> authorization = requestHeaders.get("Authorization");
        if (authorization == null || authorization.isEmpty()) {
            return null;
        }

        String authLine = authorization.get(0);
        // TODO Authentication method
        return null;
    }
}