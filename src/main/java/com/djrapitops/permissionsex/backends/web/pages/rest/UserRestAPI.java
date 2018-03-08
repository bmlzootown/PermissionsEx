package com.djrapitops.permissionsex.backends.web.pages.rest;

import com.djrapitops.permissionsex.backends.json.UserJSONService;
import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonErrorResponse;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonResponse;
import com.djrapitops.permissionsex.backends.web.pages.PageHandler;
import com.djrapitops.permissionsex.backends.web.pages.RestAPIHandler;
import com.djrapitops.permissionsex.exceptions.web.ParseException;
import com.google.gson.JsonArray;

import java.util.List;
import java.util.UUID;

/**
 * RestAPI endpoint for /api/users.
 *
 * @author Rsl1122
 */
public class UserRestAPI extends RestAPIHandler {

    private final UserJSONService userJSONService;

    public UserRestAPI(UserJSONService userJSONService) {
        this.userJSONService = userJSONService;

        registerAPIEndPoints();
    }

    private void registerAPIEndPoints() {
        registerPage("", (request, target) -> {
            String requestMethod = request.getRequestMethod();
            if ("GET".equals(requestMethod)) {
                // GET /api/users/ - provides all users as an array
                return new JsonResponse(userJSONService.getAllUsers(), 200);
            }
            if ("PUT".equals(requestMethod)) {
                // PUT /api/users/ - updates users when "Save Changes" is pressed
                try {
                    userJSONService.updateUsers((JsonArray) parseJSONFromString(getStringFromRequestBody(request))); // TODO Convert response body to JSON
                } catch (ParseException e) {
                    return e.getCause() == null ?
                            new JsonErrorResponse(e.getMessage(), 500) :
                            new JsonErrorResponse(e.getMessage() + " " + e.getCause().toString(), 500);
                }
                return new JsonResponse("", 200);
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

        if ("GET".equals(request.getRequestMethod())) {
            // GET /api/users/:id - provides a user
            try {
                String id = target.get(0);
                UUID uuid = UUID.fromString(id);
                return new JsonResponse(userJSONService.getUser(uuid));
            } catch (IllegalArgumentException e) {
                return new JsonResponse("Invalid UUID: " + e.getMessage(), 400);
            }
        }

        return new JsonErrorResponse("API endpoint not found", 404);
    }
}