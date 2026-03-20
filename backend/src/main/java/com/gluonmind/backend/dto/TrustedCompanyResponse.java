package com.gluonmind.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TrustedCompanyResponse {
    private String id;
    private String name;
    private String logoUrl;
    private int displayOrder;
    private boolean active;
}
