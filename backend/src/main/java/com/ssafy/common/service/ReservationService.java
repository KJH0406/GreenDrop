package com.ssafy.common.service;

import com.ssafy.common.dto.request.ReservationRequestDto;
import com.ssafy.common.entity.Reservation;
import com.ssafy.common.repository.ReservationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;

    public void registReservation(ReservationRequestDto reservationRequestDto) {
        Reservation reservation = Reservation.builder()
                .board(reservationRequestDto.getBoard())
                .managerId(reservationRequestDto.getManagerId())
                .dateTime(reservationRequestDto.getDateTime())
                .build();

        reservationRepository.save(reservation);
    }

    public void deleteReservation(Long reservationSeq){
        reservationRepository.delete(
                Reservation.builder()
                        .reservationSeq(reservationSeq)
                        .build()
        );
    }

    public List<Reservation> findReservationByDate() {
        List<Reservation> reservationList = reservationRepository.findByAfterNow(LocalDateTime.now());
        if (reservationList.size() == 0) {
            return (List) Reservation.builder().build();
        }
        return reservationList;
    }
}
