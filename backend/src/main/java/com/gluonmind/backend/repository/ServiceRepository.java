package com.gluonmind.backend.repository;

import com.gluonmind.backend.model.ServiceItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ServiceRepository extends MongoRepository<ServiceItem, String> {
    List<ServiceItem> findByActiveTrueOrderByDisplayOrderAsc();
}
