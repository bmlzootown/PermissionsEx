package com.djrapitops.permissionsex.backends.web;

import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.auth.BearerTokenAuth;
import com.djrapitops.permissionsex.backends.web.login.TokenVerifier;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.util.logging.Level;

/**
 * Turns HttpExchange into Request that is passed onwards, and sends the Request it receives.
 *
 * @author Rsl1122
 */
public class RequestHandler implements HttpHandler {

	private final ResponseHandler responseHandler;
	private final TokenVerifier tokenVerifier;

	RequestHandler(ResponseHandler responseHandler, TokenVerifier tokenVerifier) {
		this.responseHandler = responseHandler;
		this.tokenVerifier = tokenVerifier;
	}

	@Override
	public void handle(HttpExchange exchange) {
		Headers responseHeaders = exchange.getResponseHeaders();

		Request request = new Request(exchange);
		request.setAuth(new BearerTokenAuth(tokenVerifier, request));

		try {
			Response response = responseHandler.getResponse(request);
			response.send(exchange, responseHeaders);
		} catch (Exception e) {
			PermissionsEx.getPlugin().getLogger().log(Level.WARNING, "Dashboard error", e);
		} finally {
			exchange.close();
		}
	}
}