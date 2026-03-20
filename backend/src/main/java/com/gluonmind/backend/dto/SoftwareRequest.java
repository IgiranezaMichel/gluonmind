package com.gluonmind.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SoftwareRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    private String url;
    private int displayOrder;
    private boolean active = true;
}
