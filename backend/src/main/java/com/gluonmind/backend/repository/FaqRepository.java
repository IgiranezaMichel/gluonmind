package com.gluonmind.backend.repository;

import com.gluonmind.backend.model.Faq;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FaqRepository extends MongoRepository<Faq, String> {
    List<Faq> findByActiveTrueOrderByDisplayOrderAsc();
}
