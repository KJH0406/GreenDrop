package com.ssafy.common.service;

import com.ssafy.common.dto.request.ReservationRequestDto;
import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.Reservation;
import com.ssafy.common.repository.BoardRepository;
import com.ssafy.common.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final BoardRepository boardRepository;
    @Transactional
    public void registReservation(ReservationRequestDto reservationRequestDto) {
        Board board = boardRepository.findById(reservationRequestDto.getBoardSeq()).get();
        Reservation reservation = Reservation.builder()
                .board(board)
                .managerId(reservationRequestDto.getManagerId())
                .dateTime(reservationRequestDto.getDateTime())
                .build();

        reservationRepository.save(reservation);
    }

    @Transactional
    public void deleteReservation(Long reservationSeq){
        reservationRepository.deleteByReservationSeq(reservationSeq);
    }

    public List<Reservation> findReservationByDate() {
        List<Reservation> reservationList = reservationRepository.findByAfterNow(LocalDateTime.now());
        if (reservationList.size() == 0) {
            return null;
        }
        return reservationList;
    }
}
