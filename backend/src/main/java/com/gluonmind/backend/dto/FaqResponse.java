package com.gluonmind.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FaqResponse {
    private String id;
    private String question;
    private String answer;
    private int displayOrder;
    private boolean active;
}
