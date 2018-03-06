package ru.tehkode.permissions.backends.web;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpsConfigurator;
import com.sun.net.httpserver.HttpsParameters;
import com.sun.net.httpserver.HttpsServer;
import ru.tehkode.permissions.exceptions.web.WebServerException;

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

    private final String internalIPAddress;
    private final String serverAddress;
    private final int port;
    private boolean enabled = false;
    private boolean usingHTTPS;

    private HttpServer server;

    /**
     * Constructor.
     *
     * @param logger     Logger of PermissionsEx
     * @param dataFolder PermissionsEx data folder.
     */
    public WebServer(Logger logger, File dataFolder) {
        this.logger = logger;
        this.dataFolder = dataFolder;

        internalIPAddress = "0.0.0.0"; // TODO Config setting
        serverAddress = ""; // TODO get Address from server.properties or IP service if empty
        port = 80; // TODO Config setting
        // TODO HTTPS Certificate Config settings

        /* Wanted Settings
        WebServer:
          Enabled: true
          Port: 80
          Security:
            SSL-Certificate:
              KeyStorePath: 'Cert.jks'
              KeyPass: 'default'
              StorePass: 'default'
              Alias: 'alias'
          # InternalIP usually does not need to be changed, only change it if you know what you're doing!
          # 0.0.0.0 allocates Internal (local) IP automatically for the WebServer.
          InternalIP: 0.0.0.0
        */
    }

    public void enable() throws WebServerException {
        // TODO Setting to completely disable WebServer.
        server = initServer();

        ResponseHandler responseHandler = new ResponseHandler();
        RequestHandler requestHandler = new RequestHandler(responseHandler);

        server.createContext("/", requestHandler);

        server.setExecutor(new ThreadPoolExecutor(4, 8, 30, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(100)));
        server.start();

        enabled = true;
        logger.log(Level.INFO, "WebServer running on port " + port + " (" + getAccessAddress() + ")");
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
        if (true) { // TODO Remove temp exception after getting config settings
            throw new WebServerException("HTTPS not available.");
        }
        // TODO Certificate, requires config settings.
        String keyStorePath = "";
        if (!Paths.get(keyStorePath).isAbsolute()) {
            keyStorePath = dataFolder + File.separator + keyStorePath;
        }
        char[] storePass = "".toCharArray();
        char[] keyPass = "".toCharArray();
        String alias = "";

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
            logger.log(Level.INFO, "WebServer has been disabled.");
        }
        enabled = false;
    }

    /**
     * Method to use for giving users links to the WebServer.
     *
     * @return Valid address to the server.
     */
    public String getAccessAddress() {
        int port = usingHTTPS ? (this.port != 443 ? this.port : 443) : (this.port != 80 ? this.port : 80);

        return (usingHTTPS ? "https" : "http") + "://" + serverAddress + ":" + port;
    }

    public boolean isUsingHTTPS() {
        return usingHTTPS;
    }

    public boolean isEnabled() {
        return enabled;
    }
}