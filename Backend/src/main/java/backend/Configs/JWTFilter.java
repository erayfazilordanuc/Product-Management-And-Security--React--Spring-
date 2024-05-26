package backend.Configs;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import backend.Services.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter{ // adreslerin header'larından jwt'leri alır

    private final JWTService jwtService;

    @Override
    protected void doFilterInternal(@SuppressWarnings("null") HttpServletRequest httpServletRequest,
                                    @SuppressWarnings("null") HttpServletResponse httpServletResponse,
                                    @SuppressWarnings("null") FilterChain filterChain)
                                    throws ServletException, IOException{
        String header = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);

        if(header != null){
            String[] headerElements = header.split(" ");

                System.out.println("\nHttpServletRequest : " + httpServletRequest + "\nHttpServletResponse : " + httpServletResponse + "\n");
                System.out.println("\nJWT Bearer : " + header + "\n");

            if(headerElements.length==2 && headerElements[0].equals("Bearer")){
                try{
                    // burada javada bulunan SecurityContextHolder sınıfına authentication tanımlanır 
                    // ki SecurityConfig dosyasındaki SecurityFiltercChain'de kullanıcı doğrulanmış gözüksün ve istediği adrese ulaşabilsin
                    // örnek kısım;
                    // SecurityConfig.java satır 33,34
                    // .requestMatchers(HttpMethod.POST, "/login", "/register").permitAll()
                    // .anyRequest().authenticated()) ---> bu kısımdan geçebilmesini sağlar
                    SecurityContextHolder.getContext().setAuthentication(jwtService.validateToken(headerElements[1])); // burada setAuthentication metodunun token ile yapılmasının nedeni olası güvenlik açılarını önlemek
                    
                        System.out.println(SecurityContextHolder.getContext());
                    
                } catch (RuntimeException e) {
                    SecurityContextHolder.clearContext();
                    throw e;
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        
        filterChain.doFilter(httpServletRequest, httpServletResponse);

    }
}

// @RequiredArgsConstructor
// public class JWTFilter extends OncePerRequestFilter {
//     private final JWTService jwtService;

//     @Override
//     protected void doFilterInternal(HttpServletRequest request,
//                                     HttpServletResponse response,
//                                     FilterChain filterChain) throws ServletException, IOException {
//         String header = request.getHeader(HttpHeaders.AUTHORIZATION);

//         if (header != null && header.startsWith("Bearer ")) {
//             String token = header.substring(7);
//             try {
//                 Authentication authentication = jwtService.validateToken(token);
//                 SecurityContextHolder.getContext().setAuthentication(authentication);
//             } catch (Exception e) {
//                 SecurityContextHolder.clearContext();
//             }
//         }

//         filterChain.doFilter(request, response);
//     }
// }
