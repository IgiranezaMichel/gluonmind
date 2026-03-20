package com.gluonmind.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class UserResponse {
    private String id;
    private String username;
    private String fullName;
    private String email;
    private String phone;
    private boolean enabled;
    private Set<String> roles;
}
