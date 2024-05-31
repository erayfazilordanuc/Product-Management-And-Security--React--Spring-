package backend.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveDTO {
    
    private int id;
    private String name;
    private String surname;
    private String username;
    private String email;

}
