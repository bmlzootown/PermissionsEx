package com.djrapitops.permissionsex.backends.web.login;

import org.bukkit.configuration.ConfigurationSection;
import org.bukkit.configuration.InvalidConfigurationException;
import org.mindrot.jbcrypt.BCrypt;
import ru.tehkode.permissions.backends.file.FileConfig;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class YamlPasswordStorage extends FileConfig implements PasswordStorage {

	private File configFile;

	public YamlPasswordStorage(File dataFolder) {
		this(new File(dataFolder, "dashboard_users.yml"), true);
	}

	private YamlPasswordStorage(File configFile, boolean b) {
		super(configFile, new Object(), "users");
		this.configFile = configFile;
	}

	@Override
	public boolean userExists(String username) {
		return super.contains("users." + username);
	}

	public void storePassword(String username, String password, String registeredBy) throws IOException {
		Map<String, String> values = new HashMap<>();
		values.put("registered_by", registeredBy);
		values.put("password", password);

		super.set("users." + username, values);
		super.save();
	}

	@Override
	public int loadAndHash() throws IOException, InvalidConfigurationException {
		createEmptyFile();
		super.load();
		ConfigurationSection users = getConfigurationSection("users");
		if (users == null) {
			return 0;
		}

		int userCount = 0;
		for (String username : users.getKeys(false)) {
			userCount++;
			String key = username + ".password";
			if (users.contains(key)) {
				System.out.println("Contains unhashed: " + username);
				Map<String, String> newContent = new HashMap<>();
				newContent.put("pass_hash", BCrypt.hashpw(users.getString(key), BCrypt.gensalt()));
				users.set(username, newContent);
				System.out.println("Saved hashed: " + username);
			}
		}

		save();
		return userCount;
	}

	@Override
	public boolean passwordMatches(String username, String password) {
		String hashedPass = getHash(username);
		return hashedPass != null && BCrypt.checkpw(password, hashedPass);
	}

	private String getHash(String username) {
		return super.getString("users." + username + ".pass_hash");
	}


	private void createEmptyFile() throws IOException {
		if (!configFile.exists()) {
			configFile.createNewFile();
		}
	}
}
