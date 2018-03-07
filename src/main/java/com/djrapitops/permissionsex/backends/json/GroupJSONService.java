package com.djrapitops.permissionsex.backends.json;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

/**
 * Interface for  JSON conversion coming from and going to the Groups RestAPI.
 *
 * @author Rsl1122
 */
public interface GroupJSONService {

    /*
        Group JSON format

        {
            TODO Figure out group json format.
        }
    */

    /**
     * Used to get a JSON array that contains all groups.
     *
     * @return Array of groups in Group JSON format
     */
    JsonArray getAllGroups();

    /**
     * Used to get a JSON of a single group.
     *
     * @param groupName Name of the group.
     * @return group in Group JSON format
     */
    JsonElement getGroup(String groupName);

    /**
     * Used to get update groups in the original JsonArray source.
     *
     * @param groups JsonArray that contains all groups in Group JSON format.
     *               Should be parsed in a way that can replace the old data.
     *               TODO Figure if only changed groups should be sent.
     */
    void updateGroups(JsonArray groups);

}