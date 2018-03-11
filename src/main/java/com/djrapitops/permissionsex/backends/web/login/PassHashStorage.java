package com.djrapitops.permissionsex.backends.web.login;

public interface PassHashStorage {

	/**
	 * Stores the salted hash for a user.
	 *
	 * @param username Name of the user.
	 * @param hash     Salted password hash.
	 */
	void storeHash(String username, String hash);

	/**
	 * Get the salted password has of a user.
	 *
	 * @param username NAme of the user.
	 * @return Salted password hash.
	 */
	String getHash(String username);

}
