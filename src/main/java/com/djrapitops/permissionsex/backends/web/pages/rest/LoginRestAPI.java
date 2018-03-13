package com.djrapitops.permissionsex.backends.web.pages.rest;

import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonErrorResponse;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonResponse;
import com.djrapitops.permissionsex.backends.web.login.PassHashStorage;
import com.djrapitops.permissionsex.backends.web.login.TokenVerifier;
import com.djrapitops.permissionsex.backends.web.pages.PageHandler;
import com.djrapitops.permissionsex.backends.web.pages.RestAPIHandler;
import com.djrapitops.permissionsex.exceptions.ParseException;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.mindrot.jbcrypt.BCrypt;

import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * RestAPI endpoint for /api/login.
 *
 * @author Rsl1122
 */
public class LoginRestAPI extends RestAPIHandler {

	private final TokenVerifier verifier;
	private final PassHashStorage passHashStorage;

	public LoginRestAPI(TokenVerifier verifier, PassHashStorage passHashStorage) {
		this.verifier = verifier;
		this.passHashStorage = passHashStorage;
		registerAPIEndPoints();
	}

	private void registerAPIEndPoints() {
		registerPage("", (request, target) -> {
			String requestMethod = request.getRequestMethod();
			// POST /api/login/ - used to get a Token from username and password.
			if ("POST".equals(requestMethod)) {
				try {
					JsonElement json = parseJSONFromString(request.getRequestBodyString());
					if (json.isJsonObject()) {
						JsonObject loginJSON = json.getAsJsonObject();
						JsonElement usernameJSON = loginJSON.get("username");
						if (!usernameJSON.isJsonPrimitive()) {
							return new JsonErrorResponse("'username' not provided or wrong format.", 400);
						}
						JsonElement passwordJSON = loginJSON.get("password");
						if (!passwordJSON.isJsonPrimitive()) {
							return new JsonErrorResponse("'username' not provided or wrong format.", 400);
						}

						String username = usernameJSON.getAsString();
						String password = passwordJSON.getAsString();

						String hashedPass = passHashStorage.getHash(username);
						if (hashedPass == null) {
							return new JsonErrorResponse("User has not registered.", 401);
						}

						if (!BCrypt.checkpw(password, hashedPass)) {
							return new JsonErrorResponse("User and Password did not match.", 401);
						}

						String token = verifier.generateToken(username);
						return new JsonResponse("{token: " + token + "}", 200);
					}
					return new JsonErrorResponse("'username' and 'password' not provided.", 400);
				} catch (ParseException | UnsupportedEncodingException e) {
					return new JsonErrorResponse(e.getMessage(), 500);
				}
			}
			return null;
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