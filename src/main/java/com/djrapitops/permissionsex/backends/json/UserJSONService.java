package com.djrapitops.permissionsex.backends.json;

import com.djrapitops.permissionsex.exceptions.ParseException;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 * Interface for JSON conversion coming from and going to the Users RestAPI.
 *
 * @author Rsl1122
 */
public interface UserJSONService {

    /*
        User JSON format

        {
            "name": "Player Name",
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
                    "information": [
                        "plugin.example.permission",
                        "-plugin.example.negated.permission"
                    ]
                },{
                    "name": "WorldName2",
                    "information": [
                        "plugin.example.permission",
                        "-plugin.example.negated.permission"
                    ]
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
	 * @param playerName Name of the player.
	 * @return user in User JSON format.
	 * @throws IllegalArgumentException if player is not known to Pex.
	 *                                  Error message should be displayable with "Invalid UUID: message"
	 */
	JsonObject getUser(String playerName) throws IllegalArgumentException;

	/**
	 * Used to get update users in the original JsonArray source.
	 *
	 * @param users JsonArray that contains all users in users in User JSON format.
	 *              Should be parsed in a way that can replace the old data.
	 * @throws ParseException if given JsonArray is malformed.
	 */
	void updateUsers(JsonArray users) throws ParseException;

}