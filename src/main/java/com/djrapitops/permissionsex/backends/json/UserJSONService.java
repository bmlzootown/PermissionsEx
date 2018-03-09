package com.djrapitops.permissionsex.backends.json;

import com.djrapitops.permissionsex.exceptions.ParseException;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.UUID;

/**
 * Interface for JSON conversion coming from and going to the Users RestAPI.
 *
 * @author Rsl1122
 */
public interface UserJSONService {

    /*
        User JSON format

        {
            "uuid": "Player UUID",
            "groups": [
                {
                    "name": "GroupName"
                },{
                    "name": "GroupName2"
                }
            ],
            "permissions": [
                "plugin.example.permission",
                "-plugin.example.negated.permission"
            ],
            "worlds:": [
                {
                    "name": "WorldName",
                    "inheritance": "WorldName2",
                    "permissions": [
                        "plugin.example.permission",
                        "-plugin.example.negated.permission"
                    ],
                },{
                    "name": "WorldName2",
                    "permissions": [
                        "plugin.example.permission",
                        "-plugin.example.negated.permission"
                    ],
                }
            ]
        }
    */

	/**
	 * Used to get a JSON array that contains all users.
	 *
	 * @return array of users in User JSON format.
	 */
	JsonArray getAllUsers();

	/**
	 * Used to get a JSON of a single user.
	 *
	 * @param uuid UUID of the player.
	 * @return user in User JSON format.
	 * @throws IllegalArgumentException if UUID is not a known player to Pex.
	 *                                  Error message should be displayable with "Invalid UUID: message"
	 */
	JsonObject getUser(UUID uuid) throws IllegalArgumentException;

	/**
	 * Used to get update users in the original JsonArray source.
	 *
	 * @param users JsonArray that contains all users in users in User JSON format.
	 *              Should be parsed in a way that can replace the old data.
	 * @throws ParseException if given JsonArray is malformed.
	 */
	void updateUsers(JsonArray users) throws ParseException;

}