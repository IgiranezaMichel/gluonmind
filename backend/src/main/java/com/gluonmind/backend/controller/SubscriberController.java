package com.gluonmind.backend.controller;

import com.gluonmind.backend.dto.BroadcastRequest;
import com.gluonmind.backend.dto.SubscriberRequest;
import com.gluonmind.backend.dto.SubscriberResponse;
import com.gluonmind.backend.mapper.SubscriberMapper;
import com.gluonmind.backend.model.Subscriber;
import com.gluonmind.backend.service.NotificationService;
import com.gluonmind.backend.service.SubscriberService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
public class SubscriberController {
    private final SubscriberService subscriberService;
    private final SubscriberMapper subscriberMapper;
    private final NotificationService notificationService;

    public SubscriberController(SubscriberService subscriberService,
                                SubscriberMapper subscriberMapper,
                                NotificationService notificationService) {
        this.subscriberService = subscriberService;
        this.subscriberMapper = subscriberMapper;
        this.notificationService = notificationService;
    }

    @PostMapping("/api/subscribers")
    public SubscriberResponse subscribe(@Valid @RequestBody SubscriberRequest request) {
        Subscriber subscriber = subscriberService.subscribe(request.getEmail());
        return subscriberMapper.toResponse(subscriber);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/api/admin/subscribers")
    public Page<SubscriberResponse> listSubscribers(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return subscriberService.getAll(pageable).map(subscriberMapper::toResponse);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/admin/notifications/broadcast")
    public void broadcast(@Valid @RequestBody BroadcastRequest request) {
        notificationService.notifySubscribers(request.getSubject(), request.getMessage());
    }
}
