package com.djrapitops.permissionsex.backends.web.login;

import org.bukkit.entity.Player;

import java.util.HashMap;
import java.util.Map;

public class RegisterStore {

	private final Map<String, String[]> codeAndUserInfo;
	private final PassHashStorage passHashStorage;

	public RegisterStore(PassHashStorage passHashStorage) {
		this.passHashStorage = passHashStorage;
		codeAndUserInfo = new HashMap<>();
	}

	/**
	 * Queues a registration code to wait for register command.
	 *
	 * @param code     Code to check register command for.
	 * @param username Username that is being registered.
	 * @param passHash Password hash of the user.
	 */
	public void queueForRegistration(String code, String username, String passHash) {
		codeAndUserInfo.put(code, new String[]{username, passHash});
	}

	/**
	 * Registers a queued password hash to the PassHashStorage.
	 *
	 * @param player Player that is registering.
	 * @param code   Register code.
	 * @throws IllegalStateException    If the player has no permission to register
	 * @throws IllegalArgumentException If a code has not been requested.
	 */
	public void register(Player player, String code)
			throws IllegalStateException, IllegalArgumentException {
		try {
			// TODO Add registration permission
			if (!player.hasPermission("pex.dashboard.use")) {
				throw new IllegalStateException("User doesn't have permission to use the dashboard");
			}

			String[] userAndPass = codeAndUserInfo.get(code);
			if (userAndPass == null) {
				throw new IllegalArgumentException("Code not present");
			}
			passHashStorage.storeHash(userAndPass[0], userAndPass[1]);
		} finally {
			codeAndUserInfo.remove(code);
		}
	}
}
