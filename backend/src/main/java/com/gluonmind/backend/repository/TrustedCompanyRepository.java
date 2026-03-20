package com.gluonmind.backend.repository;

import com.gluonmind.backend.model.TrustedCompany;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TrustedCompanyRepository extends MongoRepository<TrustedCompany, String> {
    List<TrustedCompany> findByActiveTrueOrderByDisplayOrderAsc();
}
