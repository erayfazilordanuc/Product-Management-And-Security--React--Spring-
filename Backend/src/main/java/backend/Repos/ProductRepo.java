package backend.Repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.Entities.Product;

public interface ProductRepo extends JpaRepository<Product, Integer>{}
