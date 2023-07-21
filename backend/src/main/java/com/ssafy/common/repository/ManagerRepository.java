package com.ssafy.common.repository;

import com.ssafy.common.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, Byte> {
    Optional<Manager> findById(String id);
}
