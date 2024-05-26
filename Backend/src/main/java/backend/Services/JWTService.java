package backend.Services;

import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import backend.DTOs.UserDTO;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@RequiredArgsConstructor
@Component
public class JWTService {
    
    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    private final UserService userService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String username) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 3600000); // 1 hour

        return 
            JWT.create()
                .withSubject(username)
                .withIssuedAt(now)
                .withExpiresAt(expiration)
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) throws Exception {
        // JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(secretKey)).build();

        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier jwtVerifier = JWT.require(algorithm)
                .build();
        
        DecodedJWT decodedJwt = jwtVerifier.verify(token);

        UserDTO userDto = userService.findByUsername(decodedJwt.getSubject());

        System.out.println(userDto);


        // List<SimpleGrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
        
        // UsernamePasswordAuthenticationToken authorited = new UsernamePasswordAuthenticationToken(userDto, token, authorities);

        // System.out.println(authorited);


        UsernamePasswordAuthenticationToken theToken = new UsernamePasswordAuthenticationToken(userDto, null, Collections.emptyList());
        // it is authenticated

        System.out.println(theToken);
        // userDto token : eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqIiwiZXhwIjoxNzE1ODEwNjE2LCJpYXQiOjE3MTU4MDcwMTZ9.XgFdwQ-b3MxyofNUFBhPmxOwQliEKgzv-R5oPwRkXlQ

        return theToken;
    }
}
