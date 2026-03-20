package com.gluonmind.backend.mapper;

import com.gluonmind.backend.dto.FaqResponse;
import com.gluonmind.backend.model.Faq;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FaqMapper {
    FaqResponse toResponse(Faq faq);
}
