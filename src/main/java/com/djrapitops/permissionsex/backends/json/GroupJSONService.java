package com.djrapitops.permissionsex.backends.json;

import com.djrapitops.permissionsex.exceptions.ParseException;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

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
                    "information": [ # contains permissions
                        "plugin.example.permission",
                        "-plugin.example.negated.permission"
                    ]
                },{
                    "name": "WorldName2",
                    "information": [ # contains permissions
                        "plugin.example.permission",
                        "-plugin.example.negated.permission"
                    ]
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
	 * @throws IllegalArgumentException if plugin can not be found with that name.
	 *                                  Error message should be displayable with "Invalid Plugin Name: message"
	 */
	JsonObject getGroup(String groupName) throws IllegalArgumentException;

	/**
	 * Used to get update groups in the original JsonArray source.
	 *
	 * @param groups JsonArray that contains all groups in Group JSON format.
	 *               Should be parsed in a way that can replace the old data.
	 * @throws ParseException if given JsonArray is malformed.
	 */
	void updateGroups(JsonArray groups) throws ParseException;

}