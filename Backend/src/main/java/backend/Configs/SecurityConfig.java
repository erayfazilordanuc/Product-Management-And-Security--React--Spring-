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
                        .requestMatchers("/user/login").permitAll()
                        .requestMatchers("/user/register").permitAll()
                        .requestMatchers("/user/sendCode").permitAll()
                        .requestMatchers("/products/limitedListAll").permitAll() 
                        .requestMatchers("/products/getImage").permitAll()
                        .anyRequest().authenticated())                        
                        // hasRole() ya da hasAuthority() eklenebilir
        ;
        return http.build();
    }

}
