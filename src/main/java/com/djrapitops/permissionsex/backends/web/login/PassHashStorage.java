package com.djrapitops.permissionsex.backends.web.login;

import java.io.IOException;
import java.util.UUID;

public interface PassHashStorage {

	/**
	 * Stores the salted hash for a user.
	 *
	 * @param uuid     UUID of the player registering.
	 * @param username Name of the user.
	 * @param hash     Salted password hash.
	 */
	void storeHash(UUID uuid, String username, String hash) throws IOException;

	/**
	 * Get the salted password has of a user.
	 *
	 * @param username NAme of the user.
	 * @return Salted password hash.
	 */
	String getHash(String username);

}
