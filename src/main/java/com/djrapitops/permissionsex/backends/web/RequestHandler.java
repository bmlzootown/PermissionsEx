package com.djrapitops.permissionsex.backends.web;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;

/**
 * Turns HttpExchange into Request and passes it onwards.
 *
 * @author Rsl1122
 */
public class RequestHandler implements HttpHandler {

    public RequestHandler(ResponseHandler responseHandler) {

    }

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {
        // TODO
    }
}