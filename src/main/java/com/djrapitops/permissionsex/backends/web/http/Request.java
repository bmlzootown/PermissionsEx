package com.djrapitops.permissionsex.backends.web.http;

import com.djrapitops.permissionsex.backends.web.http.auth.Authentication;
import com.djrapitops.permissionsex.utilities.Wrapper;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.InputStream;
import java.util.zip.GZIPInputStream;

/**
 * Represents a HTTP request.
 *
 * @author Rsl1122
 */
public class Request {

    private final String requestMethod;
    private final String target;
    private Authentication auth;

    private Wrapper<InputStream> requestBodyWrapper;
    private Headers requestHeaders;

    public Request(HttpExchange exchange) {
        requestMethod = exchange.getRequestMethod();
        target = exchange.getRequestURI().toString();
        requestHeaders = exchange.getRequestHeaders();

        requestBodyWrapper = exchange::getRequestBody;
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

    public boolean hasAuth() {
        return auth != null;
    }

    public InputStream getRequestBody() throws IOException {
        String contentEncoding = getRequestHeader("Content-Encoding");
        if ("gzip".equals(contentEncoding)) {
            return new GZIPInputStream(requestBodyWrapper.get());
        } else {
            return requestBodyWrapper.get();
        }
    }

    public String getRequestHeader(String headerField) {
        return requestHeaders.getFirst(headerField);
    }
}