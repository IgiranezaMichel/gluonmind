package com.gluonmind.backend.controller;

import com.gluonmind.backend.dto.UserCreateRequest;
import com.gluonmind.backend.dto.UserResponse;
import com.gluonmind.backend.dto.UserUpdateRequest;
import com.gluonmind.backend.mapper.UserMapper;
import com.gluonmind.backend.model.User;
import com.gluonmind.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/api/admin/users")
    public UserResponse createUser(@Valid @RequestBody UserCreateRequest request) {
        User user = userService.createUser(request);
        return userMapper.toResponse(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/api/admin/users")
    public Page<UserResponse> listUsers(@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userService.getAllUsers(pageable).map(userMapper::toResponse);
    }

    @PutMapping("/api/users/me")
    public UserResponse updateMe(@Valid @RequestBody UserUpdateRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.updateOwnProfile(username, request);
        return userMapper.toResponse(user);
    }
}
