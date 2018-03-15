package com.djrapitops.permissionsex.backends.web.login;

import org.bukkit.entity.Player;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class RegisterStore {

	private final Map<String, String[]> codeAndUserInfo;
	private final PasswordStorage passwordStorage;

	public RegisterStore(PasswordStorage passwordStorage) {
		this.passwordStorage = passwordStorage;
		codeAndUserInfo = new HashMap<>();
	}

	/**
	 * Queues a registration code to wait for register command.
	 *
	 * @param code     Code to check register command for.
	 * @param username Username that is being registered.
	 * @param password Password hash of the user.
	 */
	public void queueForRegistration(String code, String username, String password) {
		codeAndUserInfo.put(code, new String[]{username, password});
	}

	/**
	 * Registers a queued password hash to the PasswordStorage.
	 *
	 * @param player Player that is registering.
	 * @param code   Register code.
	 * @throws IllegalStateException    If the player has no permission to register
	 * @throws IllegalArgumentException If a code has not been requested.
	 * @throws IOException              If saving the password fails.
	 */
	public void register(Player player, String code)
			throws IllegalStateException, IllegalArgumentException, IOException {
		try {
			if (!player.hasPermission("pex.dashboard.use")) {
				throw new IllegalStateException("User doesn't have permission to use the dashboard");
			}

			String[] userAndPass = codeAndUserInfo.get(code);
			if (userAndPass == null) {
				throw new IllegalArgumentException("Code not present");
			}
			passwordStorage.storePassword(userAndPass[0], userAndPass[1], player.getUniqueId().toString());
		} finally {
			codeAndUserInfo.remove(code);
		}
	}
}
