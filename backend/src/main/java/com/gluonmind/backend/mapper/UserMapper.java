package com.gluonmind.backend.mapper;

import com.gluonmind.backend.dto.UserResponse;
import com.gluonmind.backend.model.Role;
import com.gluonmind.backend.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "roles", expression = "java(mapRoles(user.getRoles()))")
    UserResponse toResponse(User user);

    default Set<String> mapRoles(Set<Role> roles) {
        if (roles == null) return null;
        return roles.stream().map(Enum::name).collect(Collectors.toSet());
    }
}
