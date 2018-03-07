package com.djrapitops.permissionsex.backends.web.pages.rest;

import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.pages.RestAPIHandler;

import java.util.List;

/**
 * RestAPI endpoint for /api/users.
 *
 * @author Rsl1122
 */
public class UserRestAPI extends RestAPIHandler {

    @Override
    public Response getResponse(Request request, List<String> target) {
        Response errorResponse = checkAuthValidity(request);
        if (errorResponse != null) {
            return errorResponse;
        }

        return null;
    }
}