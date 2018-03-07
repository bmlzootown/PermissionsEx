package com.djrapitops.permissionsex.backends.web.http.responses;

import com.djrapitops.permissionsex.backends.web.http.Response;

/**
 * Used for simple responses when JSON is not required.
 * <p>
 * Renders a single line of text (Optionally with line breaks using {@code <br>} tags.
 *
 * @author Rsl1122
 */
public class ParagraphResponse extends Response {

    private final String paragraph;

    public ParagraphResponse(String paragraph, int httpStatusCode) {
        super("text/html");
        super.setHeader("HTTP/1.1 " + httpStatusCode);
        this.paragraph = paragraph;
    }

    @Override
    protected String getContent() {
        return "<p>" + paragraph + "</p>";
    }
}