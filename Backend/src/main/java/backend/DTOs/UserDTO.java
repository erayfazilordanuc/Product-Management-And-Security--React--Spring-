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
    private String firstName;
    private String lastName;
    private String username;
    private String token;

}
