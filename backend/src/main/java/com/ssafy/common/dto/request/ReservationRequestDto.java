package com.ssafy.common.dto.request;

import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.Reservation;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class ReservationRequestDto {
    private Long reservationSeq;
    private String managerId;
    private Board board;
    private LocalDateTime dateTime;

    public Reservation toEntity(){
        Reservation reservation = Reservation.builder()
                .managerId(managerId)
                .board(board)
                .dateTime(dateTime)
                .build();
        return reservation;
    }
}
