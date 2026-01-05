package com.hai.quizapp.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

import com.hai.quizapp.dtos.roles.RoleRequest;
import com.hai.quizapp.dtos.roles.RoleResponse;
import com.hai.quizapp.entities.Role;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface RoleMapper {

    @Mapping(target = "id", ignore = true)
    Role toEntity(RoleRequest request);

    RoleResponse toResponse(Role role);

    @Mapping(target = "id", ignore = true)
    void updateEntity(RoleRequest request, @MappingTarget Role role);
}
