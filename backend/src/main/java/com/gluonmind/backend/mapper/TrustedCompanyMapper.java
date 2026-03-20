package com.gluonmind.backend.mapper;

import com.gluonmind.backend.dto.TrustedCompanyResponse;
import com.gluonmind.backend.model.TrustedCompany;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TrustedCompanyMapper {
    TrustedCompanyResponse toResponse(TrustedCompany company);
}
