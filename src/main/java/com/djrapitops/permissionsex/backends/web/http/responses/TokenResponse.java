package com.djrapitops.permissionsex.backends.web.http.responses;

public class TokenResponse extends JsonResponse {

	private final String token;

	public TokenResponse(String token) {
		super("{\"token\": \"" + token + "\"}", 200);
		this.token = token;
	}

	public String getToken() {
		return token;
	}
}
