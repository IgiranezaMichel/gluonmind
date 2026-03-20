package com.gluonmind.backend.repository;

import com.gluonmind.backend.model.Announcement;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AnnouncementRepository extends MongoRepository<Announcement, String> {
    List<Announcement> findByActiveTrueOrderByDisplayOrderAsc();
}
