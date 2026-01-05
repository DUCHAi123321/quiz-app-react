package com.hai.quizapp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;

import com.hai.quizapp.dtos.users.UserRequest;
import com.hai.quizapp.dtos.users.UserResponse;
import com.hai.quizapp.entities.User;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {RoleMapper.class})
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "fullName", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "active", constant = "true")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    User toEntity(UserRequest request);

    @Mapping(target = "firstName", expression = "java(extractFirstName(user.getFullName()))")
    @Mapping(target = "lastName", expression = "java(extractLastName(user.getFullName()))")
    UserResponse toResponse(User user);

    @Named("extractFirstName")
    default String extractFirstName(String fullName) {
        if (fullName == null || fullName.isEmpty()) {
            return "";
        }
        String[] parts = fullName.split(" ", 2);
        return parts[0];
    }

    @Named("extractLastName")
    default String extractLastName(String fullName) {
        if (fullName == null || fullName.isEmpty()) {
            return "";
        }
        String[] parts = fullName.split(" ", 2);
        return parts.length > 1 ? parts[1] : "";
    }
}
