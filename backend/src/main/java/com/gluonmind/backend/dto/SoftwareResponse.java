package com.gluonmind.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SoftwareResponse {
    private String id;
    private String name;
    private String description;
    private String url;
    private int displayOrder;
    private boolean active;
}
