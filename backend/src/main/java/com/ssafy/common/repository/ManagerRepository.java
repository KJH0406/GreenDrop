package com.ssafy.common.repository;

import com.ssafy.common.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, Byte> {
    Optional<Manager> findById(String id);
    List<Manager> findAll();

    Long deleteByManagerSeq(Short managerSeq);
}
