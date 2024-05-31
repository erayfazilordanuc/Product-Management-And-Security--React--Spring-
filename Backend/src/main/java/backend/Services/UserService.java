package backend.Services;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import backend.DTOs.MemberDTO;
import backend.DTOs.SaveDTO;
import backend.DTOs.SignUpDTO;
import backend.DTOs.UserDTO;
import backend.Entities.User;
import backend.Exceptions.AppException;
import backend.Mappers.UserMapper;
import backend.Repos.UserRepo;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService { // UserRepo kullanarak user için gerekli işlemleri yapmamızı sağlar

    private final PasswordEncoder passwordEncoder;

    private final UserRepo userRepo;
    
    private final UserMapper userMapper;

    public UserDTO login(MemberDTO memberDto) {
        User user = userRepo.findByUsername(memberDto.getUsername())
        .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        //      Alternative
        // Optional<User> user = userRepository.findByLogin(credentialsDto.getLogin()); 
        // if(!user.isPresent()){
        //    throw error;

        if (passwordEncoder.matches(CharBuffer.wrap(memberDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDTO register(SignUpDTO signUpDto){
        Optional<User> optionalUser = userRepo.findByUsername(signUpDto.getUsername());
        
        if(optionalUser.isPresent()){
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(signUpDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDto.getPassword())));

        // entity sadece veritabanına kayıtta kullanılıyor.
        // diğer zamanlarda veri taşınması için DTO'lar kullanılıyor
        User savedUser = userRepo.save(user);

        return userMapper.toUserDto(savedUser);
    }

    public UserDTO findByUsername(String username) throws Exception{
        username = username.replace("\"",""); // username "username" şeklinde geliyor burada da o parantezler temizleniyor
        User user = userRepo.findByUsername(username)
        .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND)); // 404
        return userMapper.toUserDto(user);
    }

    public SaveDTO getUserInfo(int id){
        SaveDTO dtoToSend = new SaveDTO();
        User user = userRepo.findById(id).get();
        dtoToSend.setName(user.getName());
        dtoToSend.setSurname(user.getSurname());
        dtoToSend.setUsername(user.getUsername());
        dtoToSend.setEmail(user.getEmail());
        dtoToSend.setId(id);
        return dtoToSend;
    }

    public void save(SaveDTO saveDto){
        User user = userRepo.findById(saveDto.getId()).get();
        user.setEmail(saveDto.getEmail());
        user.setName(saveDto.getName());
        user.setSurname(saveDto.getSurname());
        user.setUsername(saveDto.getUsername());

        userRepo.save(user);
    }

}
