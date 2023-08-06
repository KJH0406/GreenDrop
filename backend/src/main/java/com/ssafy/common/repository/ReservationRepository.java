package com.ssafy.common.repository;

import com.ssafy.common.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("select r from Reservation r where r.dateTime > :now")
    List<Reservation> findByAfterNow(@Param("now") LocalDateTime now);
}
