package backend.Entities;

import org.springframework.core.io.Resource;

import jakarta.mail.Multipart;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private String color;

    @Column
    private String information;

    @Column
    private String price;

    @Column
    private int ownerId;

    @Column
    private String brand;   

    // @Column
    // private String imageName;

    // private Resource image; // --> for blob update

}
