package com.gluonmind.backend.mapper;

import com.gluonmind.backend.dto.SoftwareResponse;
import com.gluonmind.backend.model.SoftwareItem;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SoftwareMapper {
    SoftwareResponse toResponse(SoftwareItem item);
}
