package com.gluonmind.backend.service;

import com.gluonmind.backend.model.Appointment;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;
    private final String fromAddress;
    private final String host;

    public EmailService(JavaMailSender mailSender,
                        @Value("${MAIL_FROM:}") String fromAddress,
                        @Value("${spring.mail.host:}") String host) {
        this.mailSender = mailSender;
        this.fromAddress = fromAddress;
        this.host = host;
    }

    public void sendAppointmentConfirmation(Appointment appointment) {
        if (host == null || host.isBlank()) {
            return;
        }
        String subject = "Gluonmind - Appointment Received";
        String body = "Hi " + appointment.getName() + ",\n\n" +
                "Thanks for scheduling a demo. We received your request for " + appointment.getPreferredDate() + ".\n" +
                "We will reach out soon to confirm details.\n\n" +
                "- Gluonmind";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(appointment.getEmail());
        if (fromAddress != null && !fromAddress.isBlank()) {
            message.setFrom(fromAddress);
        }
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public void sendBroadcast(String to, String subject, String message) {
        if (host == null || host.isBlank()) {
            return;
        }
        try {
            MimeMessage mime = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mime, false);
            helper.setTo(to);
            if (fromAddress != null && !fromAddress.isBlank()) {
                helper.setFrom(fromAddress);
            }
            helper.setSubject(subject);
            helper.setText(message, false);
            mailSender.send(mime);
        } catch (MessagingException e) {
            // swallow to avoid failing request
        }
    }
}
