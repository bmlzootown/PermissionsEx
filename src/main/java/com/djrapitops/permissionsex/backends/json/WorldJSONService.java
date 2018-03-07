package com.djrapitops.permissionsex.backends.json;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

/**
 * Class that facilitates all JSON conversion coming from and going to the Worlds RestAPI.
 *
 * @author Rsl1122
 */
public interface WorldJSONService {

     /*
        World JSON format

        {
            TODO Figure out world json format.
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
     */
    JsonElement getWorld(String worldName);

    /**
     * Used to get update worlds in the original JsonArray source.
     *
     * @param worlds JsonArray that contains all worlds in World JSON format. Should be parsed in a way that can replace the old data.
     *               TODO Figure if only changed world should be sent.
     */
    void updateWorlds(JsonArray worlds);

}