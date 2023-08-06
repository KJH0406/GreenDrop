package com.ssafy.common.dto.request;

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
    private Long boardSeq;
    private LocalDateTime dateTime;

    public Reservation toEntity(){
        Reservation reservation = Reservation.builder()
                .managerId(managerId)
                .boardSeq(boardSeq)
                .dateTime(dateTime)
                .build();
        return reservation;
    }
}
