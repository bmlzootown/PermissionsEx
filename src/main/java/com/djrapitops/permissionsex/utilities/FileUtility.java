package com.djrapitops.permissionsex.utilities;

import org.bukkit.plugin.Plugin;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * //TODO Class Javadoc Comment
 *
 * @author Rsl1122
 */
public class FileUtility {

    public static List<String> lines(Plugin plugin, String resource) throws IOException {
        List<String> lines = new ArrayList<>();
        Scanner scanner = null;
        try (InputStream inputStream = plugin.getResource(resource)) {
            scanner = new Scanner(inputStream, "UTF-8");
            while (scanner.hasNextLine()) {
                lines.add(scanner.nextLine());
            }
        } catch (NullPointerException e) {
            throw new FileNotFoundException("File not found inside jar: " + resource);
        } finally {
            if (scanner != null) {
                scanner.close();
            }
        }
        return lines;
    }

}