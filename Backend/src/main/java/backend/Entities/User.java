package backend.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false)
    @Size(max = 100)
    private String name;

    @Column(name = "surname", nullable = false)
    @Size(max = 100)
    private String surname;

    @Column(nullable = false)
    @Size(max = 100)
    private String username;

    @Column(nullable = false)
    @Size(max = 100)
    private String password;
    
    @Column(nullable = true)
    private String email;
}
