package com.gluonmind.backend.mapper;

import com.gluonmind.backend.dto.SubscriberResponse;
import com.gluonmind.backend.model.Subscriber;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SubscriberMapper {
    SubscriberResponse toResponse(Subscriber subscriber);
}
