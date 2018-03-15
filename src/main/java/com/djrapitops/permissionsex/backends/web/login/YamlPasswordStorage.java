package com.djrapitops.permissionsex.backends.web.login;

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

	@Override
	public void storePassword(String username, String password, String registeredBy) throws IOException {
		Map<String, String> values = new HashMap<>();
		values.put("registered_by", registeredBy);
		values.put("password", password);

		super.set("users." + username, values);
		super.save();
	}

	@Override
	public boolean passwordMatches(String username, String password) {
		return password != null && password.equals(getString("users." + username + ".password"));
	}

	public void createEmptyFile() throws IOException {
		if (!configFile.exists()) {
			configFile.createNewFile();
		}
	}
}
