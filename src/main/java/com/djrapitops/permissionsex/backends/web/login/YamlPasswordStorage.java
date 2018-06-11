package com.djrapitops.permissionsex.backends.web.login;

import org.bukkit.configuration.ConfigurationSection;
import org.bukkit.configuration.InvalidConfigurationException;
import org.mindrot.jbcrypt.BCrypt;
import ru.tehkode.permissions.backends.file.FileConfig;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;

public class YamlPasswordStorage extends FileConfig implements PasswordStorage {

	private File configFile;

	public YamlPasswordStorage(File dataFolder) {
		this(new File(dataFolder, "dashboard_users.yml"), true);
	}

	private YamlPasswordStorage(File configFile, boolean b) {
		super(configFile, new Object());
		this.configFile = configFile;
	}

	@Override
	public boolean userExists(String username) {
		return getUsersConfigSection().contains(username);
	}

	@Override
	public int loadAndHash() throws IOException, InvalidConfigurationException {
		createEmptyFile();
		super.load();
		ConfigurationSection users;
		try {
			users = getUsersConfigSection();
		} catch (IllegalStateException e) {
			return 0;
		}

		int userCount = 0;
		for (String username : users.getKeys(false)) {
			userCount++;
			ConfigurationSection user = users.getConfigurationSection(username);
			String unhashedPass = user.getString("password");
			if (unhashedPass != null) {
				Map<String, String> newContent = new HashMap<>();
				newContent.put("pass_hash", BCrypt.hashpw(unhashedPass, BCrypt.gensalt()));
				users.set(username, newContent);
				PermissionsEx.getPlugin().getLogger().log(Level.INFO, "New User: " + username);
			}
		}

		set("users", users);

		save();
		load();
		return userCount;
	}

	private ConfigurationSection getUsersConfigSection() {
		ConfigurationSection users = getConfigurationSection("users");
		if (users == null) {
			throw new IllegalStateException("'users' not present in dashboard_users.yml. Check 'How to create an account?'.");
		}
		return users;
	}

	@Override
	public boolean passwordMatches(String username, String password) {
		String hashedPass = getHash(username);
		return hashedPass != null && BCrypt.checkpw(password, hashedPass);
	}

	private String getHash(String username) {
		ConfigurationSection user = getUsersConfigSection().getConfigurationSection(username);
		if (user == null) {
			throw new IllegalArgumentException("User config section could not be found for '" + username + "'. (Did you restart after adding users?)");
		}
		if (!user.contains("pass_hash")) {
			throw new IllegalArgumentException("" + username + "'s password has not been hashed yet and can not be used until Pex restarts.");
		}
		return user.getString("pass_hash");
	}


	private void createEmptyFile() throws IOException {
		if (!configFile.exists()) {
			configFile.createNewFile();
		}
	}
}
