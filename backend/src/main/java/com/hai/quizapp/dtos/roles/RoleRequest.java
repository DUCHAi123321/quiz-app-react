package com.hai.quizapp.dtos.roles;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RoleRequest(
        @NotBlank(message = "Role name is required")
        @Size(min = 3, max = 50, message = "Role name must be between 3 and 50 characters")
        String name,
        @Size(max = 255, message = "Description must not exceed 255 characters")
        String description,
        Boolean active
        ) {

}
