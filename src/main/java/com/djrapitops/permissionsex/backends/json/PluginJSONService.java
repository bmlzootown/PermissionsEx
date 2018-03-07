package com.djrapitops.permissionsex.backends.json;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

/**
 * Interface for all JSON conversion coming from and going to the Plugin RestAPI.
 *
 * @author Rsl1122
 */
public interface PluginJSONService {

    /*
        Plugin JSON format

        {
            "name": "PluginName",
            "permissions": [
                "plugin.example.permission",
                "plugin.example.permission2"
            ]
        }
    */

    /**
     * Used to get a JSON array that contains all plugins.
     *
     * @return Array of plugins in Plugin JSON format
     */
    JsonArray getAllPlugins();

    /**
     * Used to get a JSON of a single plugin.
     *
     * @param pluginName Name of the plugin.
     * @return Plugin JSON format
     */
    JsonElement getPlugin(String pluginName);

}