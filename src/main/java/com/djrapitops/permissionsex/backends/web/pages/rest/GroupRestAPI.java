package com.djrapitops.permissionsex.backends.web.pages.rest;

import com.djrapitops.permissionsex.backends.json.GroupJSONService;
import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonErrorResponse;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonResponse;
import com.djrapitops.permissionsex.backends.web.pages.PageHandler;
import com.djrapitops.permissionsex.backends.web.pages.RestAPIHandler;
import com.djrapitops.permissionsex.exceptions.web.ParseException;
import com.google.gson.JsonArray;

import java.util.List;

/**
 * RestAPI endpoint for /api/users.
 *
 * @author Rsl1122
 */
public class GroupRestAPI extends RestAPIHandler {

    private final GroupJSONService groupJSONService;

    public GroupRestAPI(GroupJSONService groupJSONService) {
        this.groupJSONService = groupJSONService;

        registerAPIEndPoints();
    }

    private void registerAPIEndPoints() {
        registerPage("", (request, target) -> {
            String requestMethod = request.getRequestMethod();
            if ("GET".equals(requestMethod)) {
                // GET /api/groups/ - provides all users as an array
                return new JsonResponse(groupJSONService.getAllGroups(), 200);
            }
            if ("PUT".equals(requestMethod)) {
                // PUT /api/groups/ - updates users when "Save Changes" is pressed
                try {
                    groupJSONService.updateGroups((JsonArray) parseJSONFromString(getStringFromRequestBody(request)));
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
            // GET /api/groups/:name - provides a group
            try {
                String groupName = target.get(0);
                return new JsonResponse(groupJSONService.getGroup(groupName));
            } catch (IllegalArgumentException e) {
                return new JsonResponse("Invalid Group Name: " + e.getMessage(), 400);
            }
        }

        return new JsonErrorResponse("API endpoint not found", 404);
    }
}