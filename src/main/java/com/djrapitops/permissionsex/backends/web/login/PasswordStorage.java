package com.djrapitops.permissionsex.backends.web.login;

import org.bukkit.configuration.InvalidConfigurationException;

import java.io.IOException;

public interface PasswordStorage {

	boolean userExists(String username);

	boolean passwordMatches(String username, String password);

	int loadAndHash() throws IOException, InvalidConfigurationException;
}
