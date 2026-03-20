package com.gluonmind.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.Instant;

@Data
public class PublicationRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String summary;
    private String url;
    private String coverImageUrl;
    private String source;
    private int displayOrder;
    private boolean active = true;
    private Instant publishedAt;
}
