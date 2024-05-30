package backend.Controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.DTOs.MemberDTO;
import backend.DTOs.SignUpDTO;
import backend.DTOs.UserDTO;
import backend.Entities.Mail;
import backend.Entities.Product;
import backend.Entities.User;
import backend.Repos.UserRepo;
import backend.Services.JWTService;
import backend.Services.MailService;
import backend.Services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController { // Login ve register aşamalarını yöneten controller

    private final UserService userService;
    private final JWTService jwtService;
    private final MailService mailService;
    
    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody @Valid MemberDTO memberDto) throws Exception {
        UserDTO userDto = userService.login(memberDto);
        userDto.setToken(jwtService.createToken(userDto.getUsername()));

            System.out.println("\n" + "memberDTO : " + memberDto + "\n");
            System.out.println("\n" + "userDTO : " + userDto + "\n");
            System.out.println("\n" + "userDto token : " + userDto.getToken() + "\n");
            System.out.println("Logging is succesful!");

        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody @Valid SignUpDTO signUpDto) {
        UserDTO userDto = userService.register(signUpDto);
        userDto.setToken(jwtService.createToken(signUpDto.getUsername()));

            System.out.println("\n" + "signUpDTO : " + signUpDto + "\n");
            System.out.println("\n" + "signUpDTO username : " + signUpDto.getUsername() + "\n");
            System.out.println("\n" + "signUpDTO password : " + signUpDto.getPassword() + "\n");
            System.out.println("\n" + "userDTO : " + userDto + "\n");
            System.out.println("\n" + "userDTO username : " + userDto.getUsername() + "\n");
            System.out.println("\n" + "userDto token : " + userDto.getToken() + "\n");
            System.out.println("\n" + "URI : " + ResponseEntity.created(URI.create("/users/" + userDto.getId())).body(userDto));
            System.out.println("Registeration is succesful!");

        return ResponseEntity.created(URI.create("/users/" + userDto.getId())).body(userDto); // body ile json gönderir, üstte ise diğer gerekli bilgileri barındırır
    }

    @PostMapping("/sendCode")
    public void sendCode(@RequestBody SignUpDTO signUpDTO) throws Exception{
        String userEmail = null;
        int code = -1;
        
        if(signUpDTO.getEmail() == null){
            UserDTO user = userService.findByUsername(signUpDTO.getUsername());
            userEmail = user.getEmail();
        }else{userEmail = signUpDTO.getEmail();}

        int secureCode = signUpDTO.getCode();

        code = ((secureCode/610)-23)/15;

        Mail mail = new Mail();
        mail.setMessage(Integer.toString(code));
        mail.setSubject("Code");

        mailService.sendMail(userEmail, mail);
    }

    @PostMapping("/getUserId")
    public ResponseEntity<Integer> getUserId(@RequestBody String username) throws Exception{
        return ResponseEntity.ok(userService.findByUsername(username).getId());
    }

    @PostMapping("/getUserInfo")
    public ResponseEntity<UserDTO> getUserInfo(@RequestBody int id) {
        return ResponseEntity.ok(userService.getUserInfo(id));
    }

}
