package backend.Mappers;

import backend.DTOs.SignUpDTO;
import backend.DTOs.UserDTO;
import backend.Entities.User;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDTO signUpDto);

}
