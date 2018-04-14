package com.djrapitops.permissionsex.backends.web;

import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.auth.BearerTokenAuth;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonErrorResponse;
import com.djrapitops.permissionsex.backends.web.http.responses.TokenResponse;
import com.djrapitops.permissionsex.backends.web.login.TokenVerifier;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Turns HttpExchange into Request that is passed onwards, and sends the Request it receives.
 *
 * @author Rsl1122
 */
public class RequestHandler implements HttpHandler {

	private final ResponseHandler responseHandler;
	private final TokenVerifier tokenVerifier;
	private final DashboardSettings settings;
	private final Logger logger;

	RequestHandler(DashboardSettings settings, ResponseHandler responseHandler, TokenVerifier tokenVerifier, Logger logger) {
		this.settings = settings;
		this.responseHandler = responseHandler;
		this.tokenVerifier = tokenVerifier;
		this.logger = logger;
	}

	@Override
	public void handle(HttpExchange exchange) {
		Headers responseHeaders = exchange.getResponseHeaders();

		Request request = new Request(exchange);
		request.setAuth(new BearerTokenAuth(tokenVerifier, request));

		try {
			Response response = responseHandler.getResponse(request);
			if (settings.isAccessLogged() && request.getTarget().contains("/api/login")) {
				String fromAddress = exchange.getRequestHeaders().getFirst("X-FORWARDED-FOR");
				if (fromAddress == null) {
					fromAddress = exchange.getRemoteAddress().getAddress().getHostAddress();
				}
				logger.log(Level.INFO, fromAddress + " attempting login to Dashboard.");
				if (response instanceof TokenResponse) {
					String token = ((TokenResponse) response).getToken();
					Optional<String> user = tokenVerifier.getSubject(token);
					if (user.isPresent()) {
						logger.log(Level.INFO, fromAddress + " logged in as " + user.get());
					}
				} else if (response instanceof JsonErrorResponse) {
					logger.log(Level.INFO, fromAddress + " failed to login.");
				}
			}
			response.send(exchange, responseHeaders);
		} catch (Exception e) {
			PermissionsEx.getPlugin().getLogger().log(Level.WARNING, "Dashboard error", e);
		} finally {
			exchange.close();
		}
	}
}