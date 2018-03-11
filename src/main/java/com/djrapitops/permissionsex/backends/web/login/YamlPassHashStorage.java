package com.djrapitops.permissionsex.backends.web.login;

import ru.tehkode.permissions.backends.file.FileConfig;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * Stores passwords in a Yaml file in plugin's folder.
 *
 * @author Rsl1122
 */
public class YamlPassHashStorage extends FileConfig implements PassHashStorage {

	public YamlPassHashStorage(File dataFolder) {
		super(new File(dataFolder, "dashboard.yml"), new Object(), "users");
	}

	@Override
	public void storeHash(UUID uuid, String username, String hash) throws IOException {
		Map<String, String> values = new HashMap<>();
		values.put("uuid", uuid.toString());
		values.put("pass_hash", hash);

		super.set("users." + username, values);
		super.save();
	}

	@Override
	public String getHash(String username) {
		return super.getString("users." + username + ".pass_hash");
	}
}