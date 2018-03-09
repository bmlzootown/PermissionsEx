package com.djrapitops.permissionsex.backends.web.login;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import java.io.UnsupportedEncodingException;

/**
 * JWT Utility for token verification.
 *
 * @author Rsl1122
 */
public class TokenVerifier {

	private String secret;

	public TokenVerifier() {
		this.secret = "dummySecret"; // TODO Generate a secret with SecureRandom and store it somewhere
	}

	public String generateToken(String user) throws UnsupportedEncodingException, JWTCreationException {
		Algorithm algorithmHS = Algorithm.HMAC256(secret);

		return JWT.create()
				.withSubject(user)
				.sign(algorithmHS);
	}

	public boolean isTokenValid(String token) throws UnsupportedEncodingException {
		try {
			Algorithm algorithmHS = Algorithm.HMAC256(secret);

			JWT.require(algorithmHS)
					.build()
					.verify(token);
			return true;
		} catch (JWTVerificationException e) {
			return false;
		}
	}
}