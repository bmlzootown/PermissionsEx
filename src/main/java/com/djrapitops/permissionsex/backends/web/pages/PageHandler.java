package com.djrapitops.permissionsex.backends.web.pages;

import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;

import java.util.List;

/**
 * Interface for easier Response management.
 *
 * @author Rsl1122
 */
public interface PageHandler {

    Response getResponse(Request request, List<String> target);

}