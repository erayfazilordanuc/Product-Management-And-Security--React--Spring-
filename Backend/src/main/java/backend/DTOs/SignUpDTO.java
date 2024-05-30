package backend.DTOs;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpDTO {
    
    @NotEmpty
    private String name;

    @NotEmpty
    private String surname;

    @NotEmpty
    private String username;

    @NotEmpty
    private char[] password;

    @NotEmpty
    private String email;

    private int code;

}
