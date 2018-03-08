package com.djrapitops.permissionsex.exceptions.web;

/**
 * Exception to be thrown if WebServer related JSON parsing fails in some way.
 * <p>
 * For example: If the JSON is wrong format when attempting to deserialize it to config.
 *
 * @author Rsl1122
 */
public class JSONParseException extends Exception {

    /**
     * Constructor.
     *
     * @param message Message should contain valid error message to give to the frontend to display.
     */
    public JSONParseException(String message) {
        super(message);
    }

    /**
     * Constructor.
     *
     * @param message Message should contain valid error message to give to the frontend to display.
     * @param cause   Throwable that caused this exception.
     */
    public JSONParseException(String message, Throwable cause) {
        super(message, cause);
    }
}