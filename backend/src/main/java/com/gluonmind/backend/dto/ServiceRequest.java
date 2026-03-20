package com.gluonmind.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ServiceRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    private String icon;
    private int displayOrder;
    private boolean active = true;
}
