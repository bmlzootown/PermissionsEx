package ru.tehkode.permissions.backends.web;

import com.sun.net.httpserver.HttpServer;

/**
 * Backend that is in charge of serving dashboard related files and backend requests.
 *
 * @author Rsl1122
 */
public class WebServer {

    private HttpServer server;

    public void enable() {
        server = initServer();
    }

    private HttpServer initServer() {
        return null; // TODO
    }

    public void disable() {

    }

}