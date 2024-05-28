package backend.DTOs;

import org.springframework.core.io.Resource;

import lombok.Data;

@Data
public class LimitedDto {

    private int id;
    
    private String name;

    private String brand;

    private Resource image; // Şimdilik Resource ama MultipartFile da denenebilir

}
