package com.djrapitops.permissionsex.backends.json;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public interface BackupJSONService {

	/*
		Backup JSON Format
		
		{
	        "name": "BackupName2",
		    "created": 1520760393036 # Epoch ms
	    }
	 */

	/**
	 * Get a array of backup information in Backup JSON Format.
	 *
	 * @return Array in the proper format.
	 */
	JsonArray getBackupInformation();

	/**
	 * Create a new backup with the name.
	 *
	 * @param name Name of the backup to be created.
	 * @return JSONObject with the name and creation epoch ms in Backup JSON Format.
	 */
	JsonObject createBackup(String name);

	/**
	 * Deletes a backup.
	 *
	 * @param name Name of the backup to be deleted.
	 * @throws IllegalArgumentException If a backup with the name can not be found.
	 */
	void deleteBackup(String name) throws IllegalArgumentException;

	/**
	 * Creates a copy of a backup.
	 *
	 * @param name Name of the backup to be duplicated.
	 * @return Backup JSON Format of the created duplicate
	 * @throws IllegalArgumentException If a backup with the name can not be found.
	 */
	JsonObject duplicateBackup(String name) throws IllegalArgumentException;

	/**
	 * Restores a backup.
	 *
	 * @param name Name of the backup to be restored.
	 * @throws IllegalArgumentException If a backup with the name can not be found.
	 */
	void restoreBackup(String name) throws IllegalArgumentException;
}
