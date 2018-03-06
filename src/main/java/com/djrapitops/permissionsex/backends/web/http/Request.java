package com.djrapitops.permissionsex.backends.web.http;

import com.djrapitops.permissionsex.backends.web.http.auth.Authentication;

import com.sun.net.httpserver.HttpExchange;

/**
 * Represents a HTTP request.
 *
 * @author Rsl1122
 */
public class Request {

    private final String requestMethod;
    private final String target;
    private Authentication auth;

    public Request(HttpExchange exchange) {
        requestMethod = exchange.getRequestMethod();
        target = exchange.getRequestURI().toString();
    }

    public String getRequestMethod() {
        return requestMethod;
    }

    public String getTarget() {
        return target;
    }

    public Authentication getAuth() {
        return auth;
    }

    public void setAuth(Authentication auth) {
        this.auth = auth;
    }
}