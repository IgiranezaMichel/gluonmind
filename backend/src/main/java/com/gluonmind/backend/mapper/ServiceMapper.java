package com.gluonmind.backend.mapper;

import com.gluonmind.backend.dto.ServiceResponse;
import com.gluonmind.backend.model.ServiceItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServiceMapper {
    ServiceResponse toResponse(ServiceItem item);
}
