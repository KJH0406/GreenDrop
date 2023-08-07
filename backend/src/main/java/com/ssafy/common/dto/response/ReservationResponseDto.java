package com.ssafy.common.dto.response;

import com.ssafy.common.entity.Board;
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
    private LocalDateTime dateTime;
    private String question;
    private String leftAnswer;
    private String rightAnswer;

    public static ReservationResponseDto fromEntity(Board board, LocalDateTime dateTime){
        return ReservationResponseDto.builder()
                .dateTime(dateTime)
                .question(board.getQuestion())
                .leftAnswer(board.getLeftAnswer())
                .rightAnswer(board.getRightAnswer())
                .build();

    }
}
