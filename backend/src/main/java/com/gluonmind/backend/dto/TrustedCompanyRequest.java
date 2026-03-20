package com.gluonmind.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TrustedCompanyRequest {
    @NotBlank
    private String name;
    private String logoUrl;
    private int displayOrder;
    private boolean active = true;
}
