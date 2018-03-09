package com.djrapitops.permissionsex.backends.web.login;

import java.util.HashSet;
import java.util.Set;

/**
 * Stores user tokens in memory.
 *
 * @author Rsl1122
 */
public class TokenStore {

	private final Set<String> validTokens;

	public TokenStore() {
		validTokens = new HashSet<>();
	}

	public void addToken(String token) {
		validTokens.add(token);
	}

	public boolean isValid(String token) {
		return validTokens.contains(token);
	}

	public void removeToken(String token) {
		validTokens.remove(token);
	}
}