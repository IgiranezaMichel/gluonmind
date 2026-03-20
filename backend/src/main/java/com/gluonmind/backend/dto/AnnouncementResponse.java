package com.gluonmind.backend.dto;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class AnnouncementResponse {
    private String id;
    private String title;
    private String message;
    private String linkUrl;
    private int displayOrder;
    private boolean active;
    private Instant publishedAt;
}
