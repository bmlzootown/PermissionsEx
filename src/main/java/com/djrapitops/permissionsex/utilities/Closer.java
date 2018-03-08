package com.djrapitops.permissionsex.utilities;

import java.io.Closeable;
import java.io.IOException;

/**
 * Utility class for closing things that are not null.
 *
 * @author Rsl1122
 */
public class Closer {

    public static void ignoreExceptions(Closeable closeable) {
        if (closeable != null) {
            try {
                closeable.close();
            } catch (IOException e) {
                /* Ignore */
            }
        }
    }

}