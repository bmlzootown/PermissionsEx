package com.djrapitops.permissionsex.backends.web.pages.rest;

import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonErrorResponse;
import com.djrapitops.permissionsex.backends.web.http.responses.TokenResponse;
import com.djrapitops.permissionsex.backends.web.login.PasswordStorage;
import com.djrapitops.permissionsex.backends.web.login.TokenVerifier;
import com.djrapitops.permissionsex.backends.web.pages.PageHandler;
import com.djrapitops.permissionsex.backends.web.pages.RestAPIHandler;
import com.djrapitops.permissionsex.exceptions.ParseException;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;

import java.util.List;

/**
 * RestAPI endpoint for /api/login.
 *
 * @author Rsl1122
 */
public class LoginRestAPI extends RestAPIHandler {

	private final TokenVerifier verifier;
	private final PasswordStorage passwordStorage;

	public LoginRestAPI(TokenVerifier verifier, PasswordStorage passwordStorage) {
		this.verifier = verifier;
		this.passwordStorage = passwordStorage;
		registerAPIEndPoints();
	}

	private void registerAPIEndPoints() {
		registerPage("", new PageHandler() {
			@Override
			public Response getResponse(Request request, List<String> target) {
				String requestMethod = request.getRequestMethod();
				// POST /api/login/ - used to get a Token from username and password.
				if ("POST".equals(requestMethod)) {
					try {
						JsonElement json = LoginRestAPI.this.parseJSONFromString(request.getRequestBodyString());
						if (json.isJsonObject()) {
							JsonObject loginJSON = json.getAsJsonObject();
							JsonElement usernameJSON = loginJSON.get("username");
							if (!usernameJSON.isJsonPrimitive()) {
								return new JsonErrorResponse("'username' not provided or wrong format.", 400);
							}
							JsonElement passwordJSON = loginJSON.get("password");
							if (!passwordJSON.isJsonPrimitive()) {
								return new JsonErrorResponse("'password' not provided or wrong format.", 400);
							}

							String username = usernameJSON.getAsString();

							if (!passwordStorage.userExists(username)) {
								return new JsonErrorResponse("Could not find user '" + username + "'.", 401);
							}

							String password = passwordJSON.getAsString();

							if (!passwordStorage.passwordMatches(username, password)) {
								return new JsonErrorResponse("User and Password did not match.", 401);
							}

							String token = verifier.generateToken(username);
							return new TokenResponse(token);
						}
						return new JsonErrorResponse("'username' and 'password' not provided.", 400);
					} catch (JsonSyntaxException | ParseException e) {
						return new JsonErrorResponse(e.getMessage(), 500);
					}
				}
				return null;
			}
		});
	}

	@Override
	public Response getResponse(Request request, List<String> target) {
		PageHandler pageHandler = getPageHandler(target);
		if (pageHandler != null) {
			Response response = pageHandler.getResponse(request, target);
			if (response != null) {
				return response;
			}
		}

		return new JsonErrorResponse("API endpoint not found", 404);
	}
}