package com.djrapitops.permissionsex.backends.web.login;

import java.io.IOException;

public interface PasswordStorage {

	boolean userExists(String username);

	/**
	 * Stores the password for a user.
	 *
	 * @param username     Name of the user.
	 * @param password     Password in cleartext, storage decides whether to hash.
	 * @param registeredBy Who/what registered the user, UUID of a player or 'console'
	 *                     Added in order to keep the option to add password reset later.
	 */
	void storePassword(String username, String password, String registeredBy) throws IOException;

	boolean passwordMatches(String username, String password);
}
