package com.djrapitops.permissionsex.backends.web.http.responses;

import com.djrapitops.permissionsex.backends.web.http.Response;
import com.djrapitops.permissionsex.utilities.FileUtility;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.io.IOException;
import java.util.List;

/**
 * A Response for any static file that is inside the jar.
 *
 * @author Rsl1122
 */
public class FileResponse extends Response {

	private final String fileName;

	public FileResponse(String type, String fileName) {
		super(type, "");
		this.fileName = fileName;
		content = getContent();
	}

	@Override
	protected String getContent() {
		try {
			List<String> lines = FileUtility.lines(PermissionsEx.getPlugin(), fileName);
			super.setHeader("HTTP/1.1 200 OK");
			return combine(lines);
		} catch (IOException e) {
			super.setHeader("HTTP/1.1 404 Not Found");
			return fileName + " was not found inside the jar. This may be caused by jar-file changes without a server restart.";
		}
	}

	private String combine(List<String> lines) {
		StringBuilder content = new StringBuilder();
		for (String line : lines) {
			content.append(line);
		}
		return content.toString();
	}
}