package backend.Controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import backend.DTOs.LimitedDto;
import backend.DTOs.ProductDTO;
import backend.Entities.Product;
import backend.Services.ProductService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController { // Girişten sonraki işlemleri yönetmeyi sağlayan controller
    
    private final ProductService productService;

    private final String imageFolderLocation = "public/images/";

    @GetMapping("/getImage")
    public ResponseEntity<ByteArrayResource> getImage(@RequestParam("id") int id) throws IOException {
        Path path = Paths.get(imageFolderLocation + id + ".png");

        byte[] data = Files.readAllBytes(path);
        
        ByteArrayResource resource = new ByteArrayResource(data);

        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(resource);
    }

    @PostMapping("/uploadImage")
    public void uploadImage(@RequestParam("file") MultipartFile image, @RequestParam int prodId) throws IOException {
        byte[] bytes = image.getBytes();
        Path path = null;
        if(prodId == -1){
            path = Paths.get(imageFolderLocation + productService.getTheBiggestId() + ".png");
        }else{
            path = Paths.get(imageFolderLocation + prodId + ".png");
            Files.delete(path);
        }
        Files.write(path, bytes);
    }

    @GetMapping("/limitedListAll")
    public ResponseEntity<List<LimitedDto>> limitedAllProducts(){
        List<LimitedDto> info = new ArrayList<>();
        List<Product> allProducts = productService.listAll();
        for(int i=0; i<allProducts.size(); i++){
            LimitedDto temp = new LimitedDto();
            temp.setName(allProducts.get(i).getName());
            temp.setBrand(allProducts.get(i).getBrand());
            temp.setId(allProducts.get(i).getId());
            info.add(temp);
        }
        return ResponseEntity.ok(info);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<Product>> allProducts(){
        return ResponseEntity.ok(productService.listAll());
    }

    @PostMapping("/save")
    public void edit(@RequestBody ProductDTO productDto) throws IOException{
        productService.save(productDto);
    }
    
    @PostMapping("/delete")
    public void delete(@RequestBody int id) throws IOException{
        productService.delete(id);
        Path path = Paths.get(imageFolderLocation + id + ".png");
        Files.delete(path);
    }
}
