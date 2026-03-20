package com.gluonmind.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubscriberResponse {
    private String id;
    private String email;
    private boolean active;
}
