package com.gluonmind.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ServiceResponse {
    private String id;
    private String title;
    private String description;
    private String icon;
    private int displayOrder;
    private boolean active;
}
