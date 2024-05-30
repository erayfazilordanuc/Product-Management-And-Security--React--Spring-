package backend.DTOs;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    
    private int id;
    private String name;
    private String surname;
    private String username;
    private String token;
    private String email;

}
