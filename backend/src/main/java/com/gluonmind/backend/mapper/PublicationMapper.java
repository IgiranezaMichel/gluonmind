package com.gluonmind.backend.mapper;

import com.gluonmind.backend.dto.PublicationResponse;
import com.gluonmind.backend.model.Publication;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PublicationMapper {
    PublicationResponse toResponse(Publication publication);
}
