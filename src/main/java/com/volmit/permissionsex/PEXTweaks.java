package com.volmit.permissionsex;

import java.util.logging.Level;

import org.bukkit.Bukkit;
import org.bukkit.event.HandlerList;
import org.bukkit.event.Listener;

import ru.tehkode.permissions.backends.file.FileBackend;
import ru.tehkode.permissions.bukkit.PermissionsEx;
import ru.tehkode.permissions.exceptions.PermissionBackendException;

public class PEXTweaks implements Listener
{
	public static PermissionsEx instance;
	private long m;
	private long l;

	public PEXTweaks(PermissionsEx instance)
	{
		PEXTweaks.instance = instance;
		Bukkit.getPluginManager().registerEvents(this, instance);
		instance.getLogger().log(Level.INFO, "Configuring Volmit PEXTweaks");
		new BStats(instance);

		if(instance.getPermissionsManager().getBackend() instanceof FileBackend)
		{
			instance.getLogger().log(Level.INFO, "File Backend in use. Enabling hotloading.");
			FileBackend b = (FileBackend) instance.getPermissionsManager().getBackend();
			instance.getLogger().log(Level.INFO, "Hotloading Enabled for " + b.permissionsFile.getAbsolutePath());
			m = b.permissionsFile.lastModified();
			l = b.permissionsFile.length();

			Bukkit.getScheduler().scheduleSyncRepeatingTask(instance, new Runnable()
			{
				@Override
				public void run()
				{
					TICK.tick++;
					onTick();
				}
			}, 0, 0);
		}

	}

	public void onTick()
	{
		if(TICK.tick % 5 == 0)
		{
			if(instance.getPermissionsManager().getBackend() instanceof FileBackend)
			{
				FileBackend b = (FileBackend) instance.getPermissionsManager().getBackend();

				if(b.permissionsFile.lastModified() != m || b.permissionsFile.length() != l)
				{
					m = b.permissionsFile.lastModified();
					l = b.permissionsFile.length();
					instance.getLogger().log(Level.INFO, "Backend Modification Detected: " + b.permissionsFile.getAbsolutePath());

					try
					{
						instance.getPermissionsManager().reset();
						instance.getLogger().log(Level.INFO, "Permissions Hotloaded");
					}

					catch(PermissionBackendException e)
					{
						instance.getLogger().log(Level.INFO, "There was a problem hotloading " + b.permissionsFile.getName());
					}
				}
			}
		}
	}

	public void close()
	{
		HandlerList.unregisterAll(this);
	}
}
