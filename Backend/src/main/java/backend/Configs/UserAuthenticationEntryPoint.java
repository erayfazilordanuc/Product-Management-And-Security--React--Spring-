package backend.Configs;

import com.fasterxml.jackson.databind.ObjectMapper;

import backend.DTOs.ErrorDTO;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint { // Bir doğrulama işlemi hatalı olduğunda bu sınıf devreye girer

    // ObjectMapper, JSON dönüşümleri için kullanılan bir araçtır
    private static final ObjectMapper objectMapper = new ObjectMapper();

    // commence() metodu, AuthenticationEntryPoint arayüzünden miras alınan bir metottur ve bu metot, yetkilendirme hatası durumunda çağrılır.
    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
        
        // HTTP yanıtının durum kodunu ayarlar (401: Unauthorized)
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        
        // Yanıt başlıklarını ayarlar (JSON içeriği olduğunu belirtir)
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        
        // Hata nesnesini oluşturur ve JSON formatına dönüştürerek HTTP yanıtının çıktı akışına yazdırır.
        objectMapper.writeValue(response.getOutputStream(), new ErrorDTO("Unauthorized path"));
    }
}
