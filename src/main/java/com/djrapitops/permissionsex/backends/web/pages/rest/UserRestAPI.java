package com.djrapitops.permissionsex.backends.web.pages.rest;

import com.djrapitops.permissionsex.backends.json.UserJSONService;
import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonErrorResponse;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonResponse;
import com.djrapitops.permissionsex.backends.web.pages.PageHandler;
import com.djrapitops.permissionsex.backends.web.pages.RestAPIHandler;
import com.google.gson.JsonArray;

import java.util.List;

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
            if ("GET".equals(requestMethod) && target.isEmpty()) {
                // GET /api/users/ - provides all users as an array
                return new JsonResponse(userJSONService.getAllUsers(), 200);
            }
            if ("PUT".equals(requestMethod)) {
                // PUT /api/users/ - updates users when "Save Changes" is pressed
                userJSONService.updateUsers(new JsonArray()); // TODO Convert response body to JSON
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
        return new JsonErrorResponse("API endpoint not found", 404);
    }
}