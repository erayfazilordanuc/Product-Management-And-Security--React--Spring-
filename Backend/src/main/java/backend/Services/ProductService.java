package backend.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import backend.DTOs.ProductDTO;
import backend.Entities.Product;
import backend.Entities.User;
import backend.Repos.ProductRepo;
import backend.Repos.UserRepo;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final UserRepo userRepo;
    
    private final ProductRepo productRepo;

    public List<Product> listAll(){
        List<Product> allProducts = productRepo.findAll();
        return allProducts;
    }

    public void save(ProductDTO productDto){ // Kontrol et
        Optional<Product> isNull = productRepo.findById(productDto.getId());

        if(isNull.isPresent()){
            Product product = productRepo.findById(productDto.getId()).get();

            product.setBrand(productDto.getBrand());
            product.setColor(productDto.getColor());
            product.setDescription(productDto.getDescription());
            product.setInformation(productDto.getInformation());
            product.setName(productDto.getName());
            product.setPrice(productDto.getPrice());

            productRepo.save(product);
        }else{
            Product newProduct = new Product();

            newProduct.setOwnerId(productDto.getOwnerId());
            newProduct.setBrand(productDto.getBrand());
            newProduct.setColor(productDto.getColor());
            newProduct.setDescription(productDto.getDescription());
            newProduct.setInformation(productDto.getInformation());
            newProduct.setName(productDto.getName());
            newProduct.setPrice(productDto.getPrice());

            productRepo.save(newProduct);
        }
    }

    public void delete(int id){
        productRepo.deleteById(id);
    }
}
