package com.ssafy.common.service;


import com.ssafy.common.dto.response.ReservationResponseDto;
import com.ssafy.common.entity.Reservation;
import com.ssafy.common.repository.BoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class ReservationService {
    private final BoardRepository boardRepository;
    private final BoardService boardService;

    public List<ReservationResponseDto> reservationList(LocalDateTime dateTime){
        
    }
}
