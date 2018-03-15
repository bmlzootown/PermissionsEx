package com.djrapitops.permissionsex.backends.web.login;

import org.mindrot.jbcrypt.BCrypt;
import ru.tehkode.permissions.backends.file.FileConfig;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Stores passwords in a Yaml file in a hashed and salted format in plugin's folder.
 *
 * @author Rsl1122
 */
public class HashedYamlPasswordStorage extends FileConfig implements PasswordStorage {

	public HashedYamlPasswordStorage(File dataFolder) {
		super(new File(dataFolder, "dashboard_users.yml"), new Object(), "users");
	}

	@Override
	public boolean userExists(String username) {
		return super.contains("users." + username);
	}

	@Override
	public void storePassword(String username, String password, String registeredBy) throws IOException {
		storeHash(username, BCrypt.hashpw(password, BCrypt.gensalt()), registeredBy);
	}

	@Override
	public boolean passwordMatches(String username, String password) {
		String hashedPass = getHash(username);
		return hashedPass != null && BCrypt.checkpw(password, hashedPass);
	}

	private void storeHash(String username, String hash, String registeredBy) throws IOException {
		Map<String, String> values = new HashMap<>();
		values.put("registered_by", registeredBy);
		values.put("pass_hash", hash);

		super.set("users." + username, values);
		super.save();
	}

	private String getHash(String username) {
		return super.getString("users." + username + ".pass_hash");
	}
}