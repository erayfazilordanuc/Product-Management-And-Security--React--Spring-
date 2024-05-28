package backend.DTOs;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO {
    
    private int id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;

    @NotEmpty
    private String color;

    @NotEmpty
    private String information;

    @NotEmpty
    private String price;

    private int ownerId; // Unnecessary

    @NotEmpty
    private String brand;

    // private MultipartFile image;

}
