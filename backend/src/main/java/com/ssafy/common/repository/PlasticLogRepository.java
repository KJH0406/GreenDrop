package com.ssafy.common.repository;

import com.ssafy.common.entity.PlasticLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface PlasticLogRepository extends JpaRepository<PlasticLog, Long> {
    long count();

    @Query("select count(*) from PlasticLog where createdDate between :startTime and :endTime")
    int countByTime(@Param("startTime")LocalDateTime startTime, @Param("endTime")LocalDateTime endTime);

}
