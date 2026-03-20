package com.gluonmind.backend.config;

import com.gluonmind.backend.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements CommandLineRunner {
    private final UserService userService;
    private final String adminUsername;
    private final String adminPassword;
    private final String adminFullName;
    private final String adminEmail;

    public AdminSeeder(UserService userService,
                       @Value("${app.admin.username}") String adminUsername,
                       @Value("${app.admin.password}") String adminPassword,
                       @Value("${app.admin.full-name}") String adminFullName,
                       @Value("${app.admin.email}") String adminEmail) {
        this.userService = userService;
        this.adminUsername = adminUsername;
        this.adminPassword = adminPassword;
        this.adminFullName = adminFullName;
        this.adminEmail = adminEmail;
    }

    @Override
    public void run(String... args) {
        userService.ensureAdmin(adminUsername, adminPassword, adminFullName, adminEmail);
    }
}
