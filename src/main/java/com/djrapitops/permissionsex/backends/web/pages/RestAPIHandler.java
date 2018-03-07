package com.djrapitops.permissionsex.backends.web.pages;

import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.backends.web.http.auth.Authentication;
import com.djrapitops.permissionsex.backends.web.http.responses.JsonErrorResponse;

/**
 * //TODO Class Javadoc Comment
 *
 * @author Rsl1122
 */
public abstract class RestAPIHandler extends TreePageHandler {

    protected Response checkAuthValidity(Request request) {
        if (!request.hasAuth()) {
            return new JsonErrorResponse("Authorization not provided", 401);
        }
        Authentication auth = request.getAuth();
        if (!auth.isValid()) {
            return new JsonErrorResponse("Expired user token, please log-in again.", 400);
        }
        return null;
    }

}