package com.ssafy.common.dto.response;

import com.ssafy.common.entity.Board;
import com.ssafy.common.repository.BoardRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponseDto {
    private Long reservationSeq;
    private BoardResponseDto board;
    private LocalDateTime dateTime;
    private String managerId;
}
