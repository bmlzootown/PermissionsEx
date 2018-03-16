package com.djrapitops.permissionsex.backends.web.http.auth;

import com.djrapitops.permissionsex.backends.web.http.Request;
import com.djrapitops.permissionsex.backends.web.login.TokenVerifier;

/**
 * Authentication that uses tokens.
 *
 * @author Rsl1122
 */
public class BearerTokenAuth implements Authentication {

	private final String token;
	private final TokenVerifier verifier;

	public BearerTokenAuth(TokenVerifier verifier, Request request) {
		String authentication = request.getRequestHeader("Authorization");
		if (authentication != null && authentication.toLowerCase().startsWith("bearer ")) {
			token = authentication.substring(7);
		} else {
			this.token = null;
		}
		this.verifier = verifier;
	}

	@Override
	public boolean isValid() {
		return token != null && verifier.isTokenValid(token);
	}
}