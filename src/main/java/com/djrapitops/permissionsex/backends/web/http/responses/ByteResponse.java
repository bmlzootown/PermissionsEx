package com.djrapitops.permissionsex.backends.web.http.responses;

import com.djrapitops.permissionsex.backends.web.http.Response;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class ByteResponse extends Response {

	private final String fileName;

	public ByteResponse(String type, String fileName) {
		super(type);
		this.fileName = fileName;

		setHeader("HTTP/1.1 200 OK");
	}

	@Override
	protected String getContent() {
		return ""; // Not used
	}

	@Override
	public void send(HttpExchange exchange, Headers responseHeaders) throws IOException {
		responseHeaders.set("Content-Type", type);
		exchange.sendResponseHeaders(getCode(), 0);

		try (OutputStream out = exchange.getResponseBody();
		     InputStream bis = PermissionsEx.getPlugin().getResource(fileName)) {
			byte[] buffer = new byte[2048];
			int count;
			while ((count = bis.read(buffer)) != -1) {
				out.write(buffer, 0, count);
			}
		}
	}
}
