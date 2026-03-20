package com.gluonmind.backend.service;

import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private final SubscriberService subscriberService;
    private final EmailService emailService;

    public NotificationService(SubscriberService subscriberService, EmailService emailService) {
        this.subscriberService = subscriberService;
        this.emailService = emailService;
    }

    public void notifySubscribers(String subject, String message) {
        subscriberService.getActiveSubscribers().forEach(subscriber ->
                emailService.sendBroadcast(subscriber.getEmail(), subject, message)
        );
    }
}
