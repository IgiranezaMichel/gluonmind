package com.gluonmind.backend.service;

import com.gluonmind.backend.dto.AppointmentCreateRequest;
import com.gluonmind.backend.dto.AppointmentStatusUpdateRequest;
import com.gluonmind.backend.model.Appointment;
import com.gluonmind.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final EmailService emailService;
    private final NotificationService notificationService;
    private final boolean notifySubscribers;

    public AppointmentService(AppointmentRepository appointmentRepository,
                              EmailService emailService,
                              NotificationService notificationService,
                              @Value("${app.notifications.notify-subscribers-on-appointment}") boolean notifySubscribers) {
        this.appointmentRepository = appointmentRepository;
        this.emailService = emailService;
        this.notificationService = notificationService;
        this.notifySubscribers = notifySubscribers;
    }

    public Appointment create(AppointmentCreateRequest request) {
        Appointment appointment = Appointment.builder()
                .name(request.getName())
                .email(request.getEmail())
                .company(request.getCompany())
                .preferredDate(request.getPreferredDate())
                .message(request.getMessage())
                .status("NEW")
                .build();
        Appointment saved = appointmentRepository.save(appointment);
        emailService.sendAppointmentConfirmation(saved);
        if (notifySubscribers) {
            notificationService.notifySubscribers(
                    "New appointment request",
                    "A new appointment request was submitted by " + saved.getName() + "."
            );
        }
        return saved;
    }

    public Page<Appointment> getAll(Pageable pageable) {
        return appointmentRepository.findAll(pageable);
    }

    public Appointment updateStatus(String id, AppointmentStatusUpdateRequest request) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
        appointment.setStatus(request.getStatus());
        appointment.setNotes(request.getNotes());
        return appointmentRepository.save(appointment);
    }
}
