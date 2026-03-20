package com.gluonmind.backend.controller;

import com.gluonmind.backend.dto.AppointmentCreateRequest;
import com.gluonmind.backend.dto.AppointmentResponse;
import com.gluonmind.backend.dto.AppointmentStatusUpdateRequest;
import com.gluonmind.backend.mapper.AppointmentMapper;
import com.gluonmind.backend.model.Appointment;
import com.gluonmind.backend.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final AppointmentMapper appointmentMapper;

    public AppointmentController(AppointmentService appointmentService, AppointmentMapper appointmentMapper) {
        this.appointmentService = appointmentService;
        this.appointmentMapper = appointmentMapper;
    }

    @PostMapping("/api/appointments")
    public AppointmentResponse create(@Valid @RequestBody AppointmentCreateRequest request) {
        Appointment appointment = appointmentService.create(request);
        return appointmentMapper.toResponse(appointment);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/api/admin/appointments")
    public Page<AppointmentResponse> list(@RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return appointmentService.getAll(pageable).map(appointmentMapper::toResponse);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/api/admin/appointments/{id}/status")
    public AppointmentResponse updateStatus(@PathVariable String id,
                                            @Valid @RequestBody AppointmentStatusUpdateRequest request) {
        Appointment updated = appointmentService.updateStatus(id, request);
        return appointmentMapper.toResponse(updated);
    }
}
