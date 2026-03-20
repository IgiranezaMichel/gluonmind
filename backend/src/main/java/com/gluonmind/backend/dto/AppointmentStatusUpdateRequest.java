package com.gluonmind.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AppointmentStatusUpdateRequest {
    @NotBlank
    private String status;
    private String notes;
}
