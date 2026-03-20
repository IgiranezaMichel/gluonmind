package com.gluonmind.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class PublicationResponse {
    private String id;
    private String title;
    private String summary;
    private String url;
    private String coverImageUrl;
    private String source;
    private int displayOrder;
    private boolean active;
    private Instant publishedAt;
}
