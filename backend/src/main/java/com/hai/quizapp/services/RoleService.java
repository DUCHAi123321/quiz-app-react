package com.hai.quizapp.services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hai.quizapp.dtos.roles.RoleRequest;
import com.hai.quizapp.dtos.roles.RoleResponse;
import com.hai.quizapp.enums.RoleEnum;

public interface RoleService {

    Page<RoleResponse> getAllRoles(Pageable pageable);

    Page<RoleResponse> searchRoles(RoleEnum name, Boolean active, Pageable pageable);

    RoleResponse getRoleById(UUID id);

    RoleResponse createRole(RoleRequest request);

    RoleResponse updateRole(UUID id, RoleRequest request);

    void deleteRole(UUID id);
}
