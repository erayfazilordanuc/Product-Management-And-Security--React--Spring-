package backend.Repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.Entities.User;

public interface UserRepo extends JpaRepository<User, Integer>{ // veritabanı ile bağlantı kurar
    Optional<User> findByUsername(String username);    
}