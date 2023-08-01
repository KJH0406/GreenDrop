package com.ssafy.common.repository;

import com.ssafy.common.entity.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    public List<Equipment> findAll();

    public List<Equipment> findEquipmentByEquipmentSeq(Long equipmentSeq);
}
