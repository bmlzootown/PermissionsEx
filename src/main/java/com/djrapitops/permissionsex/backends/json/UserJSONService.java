package com.djrapitops.permissionsex.backends.json;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

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
            TODO Figure out user json format.
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
     */
    JsonElement getUser(UUID uuid);

    /**
     * Used to get update users in the original JsonArray source.
     *
     * @param users JsonArray that contains all users in users in User JSON format.
     *              Should be parsed in a way that can replace the old data.
     *              TODO Figure if only changed users should be sent.
     */
    void updateUsers(JsonArray users);

}