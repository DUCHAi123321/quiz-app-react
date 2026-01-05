package com.hai.quizapp.dtos.roles;

import com.hai.quizapp.enums.RoleEnum;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RoleRequest(
        @NotNull(message = "Role name is required")
        RoleEnum name,
        @Size(max = 255, message = "Description must not exceed 255 characters")
        String description,
        Boolean active
        ) {

}
