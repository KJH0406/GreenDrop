package com.ssafy.common.dto.request;

import com.ssafy.common.entity.Board;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class BoardRequestDto {

    private Long boardSeq;
    private String question;
    private String leftAnswer;
    private String rightAnswer;
    private String ip;
    private String nickname;
    private String password;
    private Integer likeCount;
    private Integer isDeleted;
    private LocalDateTime deletedDate;
    private LocalDateTime modified;

    public Board toEntity() {
        Board board = Board.builder()
                .boardSeq(boardSeq)
                .question(question)
                .leftAnswer(leftAnswer)
                .rightAnswer(rightAnswer)
                .ip(ip)
                .nickname(nickname)
                .password(password)
                .likeCount(likeCount)
                .isDeleted(isDeleted)
                .deletedDate(deletedDate)
                .modified(modified)
                .build();
        return board;
    }

}
