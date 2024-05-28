package backend.Configs;

import backend.Services.JWTService;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig { // Adresleri filtreler

    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
    private final JWTService jwtService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .exceptionHandling().authenticationEntryPoint(userAuthenticationEntryPoint)
                .and()
                .addFilterBefore(new JWTFilter(jwtService), BasicAuthenticationFilter.class)    
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/products/limitedListAll").permitAll() // /login ve /register adreslerine herkes ulaşabilir
                        .requestMatchers("/products/edit").permitAll()   
                        .requestMatchers("/auth/sendCode").permitAll()  
                        .requestMatchers("/products/getImage").permitAll()     // fakat geri kalanlarına ulaşmaları için doğrulanmaları lazım
                        .requestMatchers("/auth/getUserId").authenticated() // warning
                        .anyRequest().authenticated())                        
                        // hasRole() ya da hasAuthority() ekle
        ;
        return http.build();
    }

}
