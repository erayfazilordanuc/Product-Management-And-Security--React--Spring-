package backend.Services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import backend.Controllers.ProductController;
import backend.DTOs.ProductDTO;
import backend.Entities.Product;
import backend.Entities.User;
import backend.Repos.ProductRepo;
import backend.Repos.UserRepo;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductService {
    
    private final ProductRepo productRepo;

    private static final Path imageFolderLocation = Paths.get("images");

    public List<Product> listAll(){
        List<Product> allProducts = productRepo.findAll();
        return allProducts;
    }

    public void save(ProductDTO productDto) throws IOException{
        Optional<Product> productVerify = productRepo.findById(productDto.getId());

        if(productVerify.isPresent()){
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

    public int numberOfImages(String imageName) throws IOException{
        int numberOfImage = 0;
        numberOfImage = (int) Files.walk(imageFolderLocation)
             .filter(path -> path.getFileName().toString().equals(imageName))
             .count();

        return numberOfImage;
    }

    public int getTheBiggestId(){
        int biggestId = 0;
        List<Product> allProducts = productRepo.findAll();
        for(int i=0; i<allProducts.size(); i++){
            if(allProducts.get(i).getId()>biggestId){
                biggestId = allProducts.get(i).getId();
            }
        }
        
        return biggestId;
    }
}
