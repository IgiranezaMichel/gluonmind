package com.gluonmind.backend.service;

import com.gluonmind.backend.dto.UserCreateRequest;
import com.gluonmind.backend.dto.UserUpdateRequest;
import com.gluonmind.backend.model.Role;
import com.gluonmind.backend.model.User;
import com.gluonmind.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(UserCreateRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        Set<Role> roles = new HashSet<>();
        if (request.getRoles() != null) {
            for (String role : request.getRoles()) {
                roles.add(Role.valueOf(role));
            }
        }
        if (roles.isEmpty()) {
            roles.add(Role.ROLE_USER);
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .enabled(true)
                .roles(roles)
                .build();
        return userRepository.save(user);
    }

    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public User updateOwnProfile(String username, UserUpdateRequest request) {
        User user = getByUsername(username);
        if (request.getFullName() != null) user.setFullName(request.getFullName());
        if (request.getEmail() != null) user.setEmail(request.getEmail());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        return userRepository.save(user);
    }

    public User ensureAdmin(String username, String password, String fullName, String email) {
        return userRepository.findByUsername(username).orElseGet(() -> {
            User admin = User.builder()
                    .username(username)
                    .password(passwordEncoder.encode(password))
                    .fullName(fullName)
                    .email(email)
                    .enabled(true)
                    .roles(Set.of(Role.ROLE_ADMIN))
                    .build();
            return userRepository.save(admin);
        });
    }
}
