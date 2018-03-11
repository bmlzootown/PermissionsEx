package com.djrapitops.permissionsex.backends.web.pages.rest;

import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonErrorResponse;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonResponse;
import com.djrapitops.permissionsex.backends.web.login.PassHashStorage;
import com.djrapitops.permissionsex.backends.web.login.RegisterStore;
import com.djrapitops.permissionsex.backends.web.pages.PageHandler;
import com.djrapitops.permissionsex.backends.web.pages.RestAPIHandler;
import com.djrapitops.permissionsex.exceptions.ParseException;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Base64;
import java.util.List;

/**
 * RestAPI endpoint for /api/register.
 *
 * @author Rsl1122
 */
public class RegisterRestAPI extends RestAPIHandler {

	private final RegisterStore registerStore;
	private final PassHashStorage passHashStorage;

	public RegisterRestAPI(RegisterStore registerStore, PassHashStorage passHashStorage) {
		this.registerStore = registerStore;
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

						if (passHashStorage.getHash(username) != null) {
							return new JsonErrorResponse("Username has already exists.", 400);
						}

						String password = passwordJSON.getAsString();

						String registerCode = Base64.getEncoder().encodeToString(username.getBytes());

						String saltedPassHash = BCrypt.hashpw(password, BCrypt.gensalt());
						
						registerStore.queueForRegistration(registerCode, username, saltedPassHash);

						return new JsonResponse("{registerCode: " + registerCode + "}", 200);
					}
					return new JsonErrorResponse("'username' and 'password' not provided.", 400);
				} catch (ParseException e) {
					return new JsonErrorResponse(e.getMessage(), 500);
				}
			}
			return null;
		});
	}

	@Override
	public Response getResponse(Request request, List<String> target) {
		Response errorResponse = checkAuthValidity(request);
		if (errorResponse != null) {
			return errorResponse;
		}

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