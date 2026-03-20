package com.gluonmind.backend.dto;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UserUpdateRequest {
    private String fullName;
    @Email
    private String email;
    private String phone;
    private String password;
}
