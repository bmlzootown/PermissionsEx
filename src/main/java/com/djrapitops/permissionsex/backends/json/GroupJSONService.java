package com.djrapitops.permissionsex.backends.json;

import com.djrapitops.permissionsex.exceptions.web.JSONParseException;
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
            "name": "GroupName",
            "inheritance": [
                "InheritedGroupName",
                "SecondInheritedGroupName"
            ],
            "permissions": [
                "plugin.example.permission",
                "-plugin.example.negated.permission"
            ],
            "worlds:": [
                {
                    "name": "WorldName",
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
     */
    void updateGroups(JsonArray groups) throws JSONParseException;

}