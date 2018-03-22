package com.djrapitops.permissionsex.backends.json;

import com.djrapitops.permissionsex.exceptions.ParseException;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 * Interface for JSON conversion coming from and going to the Worlds RestAPI.
 *
 * @author Rsl1122
 */
public interface WorldJSONService {

     /*
        World JSON format

        {
            "name": "WorldName",
            "information": [ # contains inheritance
                "WorldName2"
            ]
        }
    */

	/**
	 * Used to get a JSON array that contains all worlds.
	 *
	 * @return Array in World JSON format
	 */
	JsonArray getAllWorlds();

	/**
	 * Used to get a JSON of a single world.
	 *
	 * @param worldName Name of the World.
	 * @return World in World JSON format
	 * @throws IllegalArgumentException if name is not a known world to Pex.
	 *                                  Error message should be displayable with "Invalid World Name: message"
	 */
	JsonObject getWorld(String worldName) throws IllegalArgumentException;

	/**
	 * Used to get update worlds in the original JsonArray source.
	 *
	 * @param worlds JsonArray that contains all worlds in World JSON format. Should be parsed in a way that can replace the old data.
	 * @throws ParseException if given JsonArray is malformed.
	 */
	void updateWorlds(JsonArray worlds) throws ParseException;

}