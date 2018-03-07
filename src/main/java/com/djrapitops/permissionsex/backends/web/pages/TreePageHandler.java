package com.djrapitops.permissionsex.backends.web.pages;

import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.http.Response;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Abstract class for easier Response management.
 *
 * Contains multiple PageHandlers
 *
 * @author Rsl1122
 * @see PageHandler
 */
public abstract class TreePageHandler implements PageHandler {
    private Map<String, PageHandler> pages;

    public TreePageHandler() {
        pages = new HashMap<>();
    }

    public void registerPage(String targetPage, PageHandler handler) {
        pages.put(targetPage, handler);
    }

    public void registerPage(String targetPage, final Response response) {
        pages.put(targetPage, new PageHandler() {
            @Override
            public Response getResponse(Request request, List<String> target) {
                return response;
            }
        });
    }

    @Override
    public Response getResponse(Request request, List<String> target) {
        PageHandler pageHandler = getPageHandler(target);
        return pageHandler != null
                ? pageHandler.getResponse(request, target)
                : null;
    }

    public PageHandler getPageHandler(List<String> target) {
        if (target.isEmpty()) {
            return pages.get("");
        }
        String targetPage = target.get(0);
        target.remove(0);
        PageHandler pageHandler = pages.get(targetPage);
        if (pageHandler instanceof TreePageHandler) {
            return ((TreePageHandler) pageHandler).getPageHandler(target);
        } else {
            return pageHandler;
        }
    }

    public PageHandler getPageHandler(String targetPage) {
        return pages.get(targetPage);
    }
}