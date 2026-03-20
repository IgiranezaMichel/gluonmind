package com.gluonmind.backend.repository;

import com.gluonmind.backend.model.Publication;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PublicationRepository extends MongoRepository<Publication, String> {
    List<Publication> findByActiveTrueOrderByDisplayOrderAsc();
}
