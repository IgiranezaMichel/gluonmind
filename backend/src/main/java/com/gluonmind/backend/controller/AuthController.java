package com.gluonmind.backend.controller;

import com.gluonmind.backend.dto.AuthResponse;
import com.gluonmind.backend.dto.LoginRequest;
import com.gluonmind.backend.model.Role;
import com.gluonmind.backend.model.User;
import com.gluonmind.backend.repository.UserRepository;
import com.gluonmind.backend.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Set<String> roles = user.getRoles().stream().map(Role::name).collect(Collectors.toSet());
        String token = jwtService.generateToken(user.getUsername(), Map.of("roles", roles));
        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .fullName(user.getFullName())
                .roles(roles)
                .build();
    }

    @GetMapping("/me")
    public AuthResponse me() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Set<String> roles = user.getRoles().stream().map(Role::name).collect(Collectors.toSet());
        return AuthResponse.builder()
                .token(null)
                .username(user.getUsername())
                .fullName(user.getFullName())
                .roles(roles)
                .build();
    }
}
