package com.djrapitops.permissionsex.backends.web.http;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.zip.GZIPOutputStream;

/**
 * Represents a HTTP Response.
 *
 * @author Rsl1122
 */
public abstract class Response {

	private final String type;
	private String header;
	protected String content;

	public Response(String type) {
		this.type = type;

		header = "HTTP/1.1 501 Unimplemented";
		content = getContent();
	}

	public Response(String type, String content) {
		this.type = type;

		header = "HTTP/1.1 501 Unimplemented";
		this.content = content;
	}

	public void setHeader(String header) {
		this.header = header;
	}

	protected abstract String getContent();

	public int getCode() {
		return header == null ? 500 : Integer.parseInt(header.split(" ")[1]);
	}

	public void send(HttpExchange exchange, Headers responseHeaders) throws IOException {
		responseHeaders.set("Content-Type", type);
		responseHeaders.set("Content-Encoding", "gzip");
		exchange.sendResponseHeaders(getCode(), 0);

		try (GZIPOutputStream out = new GZIPOutputStream(exchange.getResponseBody());
		     ByteArrayInputStream bis = new ByteArrayInputStream(content.getBytes())) {
			byte[] buffer = new byte[2048];
			int count;
			while ((count = bis.read(buffer)) != -1) {
				out.write(buffer, 0, count);
			}
		}
	}
}