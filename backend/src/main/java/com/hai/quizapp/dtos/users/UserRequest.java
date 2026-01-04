package com.hai.quizapp.dtos.users;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequest(
        @NotBlank(message = "First name is required")
        @Size(max = 50, message = "First name must not exceed 50 characters")
        String firstName,
        @NotBlank(message = "Last name is required")
        @Size(max = 50, message = "Last name must not exceed 50 characters")
        String lastName,
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,
        @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
        String username,
        String phoneNumber,
        @Size(min = 8, message = "Password must be at least 8 characters")
        String password,
        LocalDate dateOfBirth,
        Boolean active,
        Set<UUID> roleIds
        ) {

    public String getFullName() {
        return firstName + " " + lastName;
    }
}
