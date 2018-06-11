package com.djrapitops.permissionsex.backends.web.http;

import com.djrapitops.permissionsex.backends.web.http.auth.Authentication;
import com.djrapitops.permissionsex.exceptions.ParseException;
import com.djrapitops.permissionsex.utilities.Closer;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;

import network.aeternum.permissionsex.glang.AccessCallback;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.zip.GZIPInputStream;

/**
 * Represents a HTTP request.
 *
 * @author Rsl1122
 */
public class Request {

	private final String requestMethod;
	private final String target;
	private Authentication auth;

	private AccessCallback<InputStream> requestBodyWrapper;
	private Headers requestHeaders;

	private String requestBody;

	public Request(HttpExchange exchange) {
		requestMethod = exchange.getRequestMethod();
		target = exchange.getRequestURI().toString();
		requestHeaders = exchange.getRequestHeaders();

		requestBodyWrapper = exchange::getRequestBody;
	}

	public String getRequestMethod() {
		return requestMethod;
	}

	public String getTarget() {
		return target;
	}

	public Authentication getAuth() {
		return auth;
	}

	public void setAuth(Authentication auth) {
		this.auth = auth;
	}

	public boolean hasAuth() {
		return auth != null;
	}

	public String getRequestBodyString() throws ParseException {
		if (requestBody == null) {
			requestBody = getStringFromRequestBody();
		}
		return requestBody;
	}

	private String getStringFromRequestBody() throws ParseException {
		try {
			return readInputStream(getRequestBody());
		} catch (IOException e) {
			throw new ParseException("Failed to get request body.", e);
		}
	}

	private String readInputStream(InputStream inputStream) throws ParseException {
		StringBuilder builder = new StringBuilder();
		BufferedReader bufferedReader = null;
		try {
			if (inputStream != null) {
				bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
				char[] charBuffer = new char[128];
				int bytesRead = -1;
				while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
					builder.append(charBuffer, 0, bytesRead);
				}
			} else {
				builder.append("");
			}
		} catch (IOException e) {
			throw new ParseException("Failed to read request body.", e);
		} finally {
			Closer.ignoreExceptions(bufferedReader);
			Closer.ignoreExceptions(inputStream);
		}

		return builder.toString();
	}

	private InputStream getRequestBody() throws IOException {
		String contentEncoding = getRequestHeader("Content-Encoding");
		if ("gzip".equals(contentEncoding)) {
			return new GZIPInputStream(requestBodyWrapper.get());
		} else {
			return requestBodyWrapper.get();
		}
	}

	public String getRequestHeader(String headerField) {
		return requestHeaders.getFirst(headerField);
	}
}