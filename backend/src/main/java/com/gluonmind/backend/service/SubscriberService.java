package com.gluonmind.backend.service;

import com.gluonmind.backend.model.Subscriber;
import com.gluonmind.backend.repository.SubscriberRepository;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
public class SubscriberService {
    private final SubscriberRepository repository;

    public SubscriberService(SubscriberRepository repository) {
        this.repository = repository;
    }

    public Subscriber subscribe(String email) {
        return repository.findByEmail(email)
                .map(existing -> {
                    existing.setActive(true);
                    return repository.save(existing);
                })
                .orElseGet(() -> repository.save(Subscriber.builder()
                        .email(email)
                        .active(true)
                        .build()));
    }

    public Page<Subscriber> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Subscriber> getActiveSubscribers() {
        return repository.findAll().stream().filter(Subscriber::isActive).toList();
    }
}
