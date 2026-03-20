package com.gluonmind.backend.mapper;

import com.gluonmind.backend.dto.AppointmentResponse;
import com.gluonmind.backend.model.Appointment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AppointmentMapper {
    AppointmentResponse toResponse(Appointment appointment);
}
