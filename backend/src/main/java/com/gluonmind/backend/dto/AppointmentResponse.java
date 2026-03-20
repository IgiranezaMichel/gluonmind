package com.gluonmind.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDate;

@Data
@Builder
public class AppointmentResponse {
    private String id;
    private String name;
    private String email;
    private String company;
    private LocalDate preferredDate;
    private String message;
    private String status;
    private Instant createdAt;
}
