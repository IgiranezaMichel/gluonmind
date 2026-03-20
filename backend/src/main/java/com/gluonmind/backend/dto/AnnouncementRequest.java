package com.gluonmind.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.Instant;

@Data
public class AnnouncementRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String message;
    private String linkUrl;
    private int displayOrder;
    private boolean active = true;
    private Instant publishedAt;
}
