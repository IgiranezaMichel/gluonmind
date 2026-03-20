package com.gluonmind.backend.repository;

import com.gluonmind.backend.model.SoftwareItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SoftwareRepository extends MongoRepository<SoftwareItem, String> {
    List<SoftwareItem> findByActiveTrueOrderByDisplayOrderAsc();
}
