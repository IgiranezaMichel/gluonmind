package com.gluonmind.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class UserCreateRequest {
    @NotBlank
    private String username;
    @NotBlank
    @Size(min = 6)
    private String password;
    private String fullName;
    @Email
    private String email;
    private String phone;
    private Set<String> roles;
}
