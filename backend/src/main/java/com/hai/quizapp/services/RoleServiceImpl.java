package com.hai.quizapp.services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.hai.quizapp.dtos.roles.RoleRequest;
import com.hai.quizapp.dtos.roles.RoleResponse;
import com.hai.quizapp.entities.Role;
import com.hai.quizapp.enums.RoleEnum;
import com.hai.quizapp.exceptions.ResourceNotFoundException;
import com.hai.quizapp.mappers.RoleMapper;
import com.hai.quizapp.repositories.RoleRepository;

import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    @Override
    public Page<RoleResponse> getAllRoles(Pageable pageable) {
        return roleRepository.findAll(pageable)
                .map(roleMapper::toResponse);
    }

    @Override
    public Page<RoleResponse> searchRoles(RoleEnum name, Boolean active, Pageable pageable) {
        Specification<Role> spec = (root, query, cb) -> {
            Predicate predicate = cb.conjunction();

            if (name != null) {
                predicate = cb.and(predicate, cb.equal(root.get("name"), name));
            }

            if (active != null) {
                predicate = cb.and(predicate, cb.equal(root.get("active"), active));
            }

            return predicate;
        };

        return roleRepository.findAll(spec, pageable)
                .map(roleMapper::toResponse);
    }

    @Override
    public RoleResponse getRoleById(UUID id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));
        return roleMapper.toResponse(role);
    }

    @Override
    public RoleResponse createRole(RoleRequest request) {
        if (roleRepository.existsByName(request.name())) {
            throw new IllegalArgumentException("Role with name " + request.name() + " already exists");
        }

        Role role = roleMapper.toEntity(request);
        Role savedRole = roleRepository.save(role);
        return roleMapper.toResponse(savedRole);
    }

    @Override
    public RoleResponse updateRole(UUID id, RoleRequest request) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id: " + id));

        // Check if name is being changed and if it already exists
        if (!role.getName().equals(request.name()) && roleRepository.existsByName(request.name())) {
            throw new IllegalArgumentException("Role with name " + request.name() + " already exists");
        }

        roleMapper.updateEntity(request, role);
        Role updatedRole = roleRepository.save(role);
        return roleMapper.toResponse(updatedRole);
    }

    @Override
    public void deleteRole(UUID id) {
        if (!roleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Role not found with id: " + id);
        }
        roleRepository.deleteById(id);
    }
}
