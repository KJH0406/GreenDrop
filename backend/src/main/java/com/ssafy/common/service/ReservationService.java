package com.ssafy.common.service;

import com.ssafy.common.dto.request.ReservationRequestDto;
import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.dto.response.ReservationResponseDto;
import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.Reservation;
import com.ssafy.common.repository.BoardRepository;
import com.ssafy.common.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final BoardRepository boardRepository;

    @Transactional
    public boolean registReservation(ReservationRequestDto reservationRequestDto) {
        Board board = boardRepository.findById(reservationRequestDto.getBoardSeq()).orElseThrow(
                () -> new IllegalArgumentException("reservation has not found")
        );
        Reservation reservation = Reservation.builder()
                .board(board)
                .managerId(reservationRequestDto.getManagerId())
                .dateTime(reservationRequestDto.getDateTime())
                .build();

        List<Reservation> reservationList = reservationRepository.findByAfterNow(LocalDateTime.now());
        for (Reservation res : reservationList) {
            if (reservationRequestDto.getDateTime().equals(res.getDateTime())) return false;
        }

        reservationRepository.save(reservation);
        return true;
    }

    @Transactional
    public void deleteReservation(Long reservationSeq) {
        reservationRepository.deleteByReservationSeq(reservationSeq);
    }

    public List<ReservationResponseDto> findReservationByDate() {

        List<Reservation> reservationList = reservationRepository.findByAfterNow(LocalDateTime.now());

        List<ReservationResponseDto> responseDtoList = new ArrayList<>();
        for (Reservation reservation : reservationList) {
            responseDtoList.add(
                    ReservationResponseDto.builder()
                            .reservationSeq(reservation.getReservationSeq())
                            .board(boardRepository.oneBoard(reservation.getBoard().getBoardSeq()))
                            .dateTime(reservation.getDateTime())
                            .managerId(reservation.getManagerId())
                            .build()
            );
        }
        return responseDtoList;
    }
}
