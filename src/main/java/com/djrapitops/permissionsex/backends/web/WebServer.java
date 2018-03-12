package com.djrapitops.permissionsex.backends.web;

import com.djrapitops.permissionsex.backends.PexDashboard;
import com.djrapitops.permissionsex.exceptions.web.WebServerException;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpsConfigurator;
import com.sun.net.httpserver.HttpsParameters;
import com.sun.net.httpserver.HttpsServer;
import ru.tehkode.permissions.bukkit.PermissionsEx;

import javax.net.ssl.*;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Paths;
import java.security.*;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Backend that is in charge of serving dashboard related files and backend requests.
 * <p>
 * This class is responsible for initializing HttpServer.
 * If Certificate settings are correct and a Certificate is provided the HttpServer will be a HttpsServer, and operate securely.
 *
 * @author Rsl1122
 */
public class WebServer {

	private final Logger logger;
	private final File dataFolder;

	private PexDashboard pexDashboard;

	private final DashboardSettings settings;
	private String internalIPAddress;
	private String serverAddress;
	private boolean enabled = false;
	private boolean usingHTTPS;

	private HttpServer server;
	private int port;

	/**
	 * Constructor.
	 *
	 * @param plugin PermissionsEx instance.
	 */
	public WebServer(PermissionsEx plugin, PexDashboard pexDashboard) {
		this.logger = plugin.getLogger();
		this.dataFolder = plugin.getDataFolder();

		settings = new DashboardSettings(plugin.getConfiguration());

		if (!settings.isWebServerEnabled()) {
			return;
		}

		internalIPAddress = settings.getInternalIP();
		port = settings.getPort();
		serverAddress = settings.getWebserverAddress().replace("PORT", String.valueOf(port));

		this.pexDashboard = pexDashboard;
	}

	public void enable() throws WebServerException {
		if (!settings.isWebServerEnabled()) {
			return;
		}

		logger.log(Level.INFO, "Enabling Dashboard WebServer..");
		server = initServer();

		ResponseHandler responseHandler = new ResponseHandler(pexDashboard);
		RequestHandler requestHandler = new RequestHandler(responseHandler);

		server.createContext("/", requestHandler);

		server.setExecutor(new ThreadPoolExecutor(4, 8, 30, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(100)));
		server.start();

		enabled = true;
		logger.log(Level.INFO, "Dashboard running on port " + port + " (" + getAccessAddress() + ")");
	}

	private HttpServer initServer() throws WebServerException {
		try {
			return initHttpsServer();
		} catch (WebServerException e) {
			logger.log(Level.WARNING, e.getMessage());
			usingHTTPS = false;
			try {
				return HttpServer.create(new InetSocketAddress(internalIPAddress, port), 10);
			} catch (IOException httpServerIOException) {
				throw new WebServerException("HTTPServer failed to start: " + httpServerIOException.getMessage());
			}
		}
	}

	/**
	 * Attempts to Initialize the HTTPSServer if possible.
	 *
	 * @return Functional HttpsServer.
	 * @throws WebServerException if something goes wrong while enabling the HTTPSServer.
	 */
	private HttpServer initHttpsServer() throws WebServerException {
		String keyStorePath = settings.getCertPath();
		if (!Paths.get(keyStorePath).isAbsolute()) {
			keyStorePath = dataFolder + File.separator + keyStorePath;
		}
		char[] storePass = settings.getCertStorePass().toCharArray();
		char[] keyPass = settings.getCertKeyPass().toCharArray();
		String alias = settings.getCertAlias();

		try (FileInputStream fIn = new FileInputStream(keyStorePath)) {
			KeyStore keystore = KeyStore.getInstance("JKS");
			keystore.load(fIn, storePass);

			Certificate cert = keystore.getCertificate(alias);
			logger.log(Level.INFO, "Found Certificate: " + cert.getType());

			KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance("SunX509");
			keyManagerFactory.init(keystore, keyPass);

			TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance("SunX509");
			trustManagerFactory.init(keystore);

			HttpsServer httpsServer = HttpsServer.create(new InetSocketAddress(internalIPAddress, port), 10);
			final SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
			sslContext.init(keyManagerFactory.getKeyManagers(), null/*trustManagerFactory.getTrustManagers()*/, null);

			httpsServer.setHttpsConfigurator(new HttpsConfigurator(sslContext) {
				@Override
				public void configure(HttpsParameters params) {
					SSLEngine engine = sslContext.createSSLEngine();

					params.setNeedClientAuth(false);
					params.setCipherSuites(engine.getEnabledCipherSuites());
					params.setProtocols(engine.getEnabledProtocols());

					SSLParameters defaultSSLParameters = sslContext.getDefaultSSLParameters();
					params.setSSLParameters(defaultSSLParameters);
				}
			});

			usingHTTPS = true;
			return httpsServer;
		} catch (KeyManagementException | NoSuchAlgorithmException e) {
			throw new WebServerException("SSL Context Initialization Failed.");
		} catch (FileNotFoundException e) {
			throw new WebServerException("SSL Certificate KeyStore File not Found: " + keyStorePath);
		} catch (IOException e) {
			throw new WebServerException("Certificate loading failed: " + e);
		} catch (KeyStoreException | CertificateException | UnrecoverableKeyException e) {
			throw new WebServerException("SSL Certificate loading Failed. " + e.getMessage());
		}
	}

	public void disable() {
		if (server != null) {
			server.stop(0);
			logger.log(Level.INFO, "Dashboard server has been disabled.");
		}
		enabled = false;
	}

	/**
	 * Method to use for giving users links to the WebServer.
	 *
	 * @return Valid address to the server.
	 */
	public String getAccessAddress() {
		return (usingHTTPS ? "https" : "http") + "://" + serverAddress;
	}

	public boolean isUsingHTTPS() {
		return usingHTTPS;
	}

	public boolean isEnabled() {
		return enabled;
	}
}