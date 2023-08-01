package com.ssafy.common.repository;

import com.ssafy.common.entity.PlasticLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlasticLogRepository extends JpaRepository<PlasticLog, Long> {
    long count();
}
