package com.gluonmind.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AppointmentCreateRequest {
    @NotBlank
    private String name;
    @NotBlank
    @Email
    private String email;
    private String company;
    @NotNull
    private LocalDate preferredDate;
    private String message;
}
