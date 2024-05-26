package backend.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    // @GetMapping("/home")
    // public ResponseEntity<String> home(){ // test
    //     return ResponseEntity.ok("Mission successful, Welcome to the home!");
    // }

    @GetMapping("/limitedListAll")
    public ResponseEntity<List<LimitedDto>> limitedAllProducts(){
        List<LimitedDto> info = new ArrayList<>();
        List<Product> allProducts = productService.listAll();
        for(int i=0; i<allProducts.size(); i++){
            LimitedDto temp = new LimitedDto();
            temp.setName(allProducts.get(i).getName());
            temp.setBrand(allProducts.get(i).getBrand());
            info.add(temp);
        }
        return ResponseEntity.ok(info);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<Product>> allProducts(){
        return ResponseEntity.ok(productService.listAll());
    }

    @PostMapping("/save")
    public void edit(@RequestBody ProductDTO productDto){
        productService.save(productDto);
    }
    
    @PostMapping("/delete")
    public void delete(@RequestBody int id){
        productService.delete(id);
    }
}
