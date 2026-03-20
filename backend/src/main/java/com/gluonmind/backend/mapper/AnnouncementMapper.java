package com.gluonmind.backend.mapper;

import com.gluonmind.backend.dto.AnnouncementResponse;
import com.gluonmind.backend.model.Announcement;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnnouncementMapper {
    AnnouncementResponse toResponse(Announcement announcement);
}
