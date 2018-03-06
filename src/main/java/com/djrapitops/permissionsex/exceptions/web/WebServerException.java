package com.djrapitops.permissionsex.exceptions.web;

/**
 * Exceptions thrown by WebServer
 *
 * @author Rsl1122
 * @see com.djrapitops.permissionsex.backends.web.WebServer
 */
public class WebServerException extends Exception {

    public WebServerException(String message) {
        super(message);
    }

    public WebServerException(String message, Throwable cause) {
        super(message, cause);
    }
}