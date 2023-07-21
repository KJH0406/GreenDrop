package com.ssafy.common.dto;

import com.ssafy.common.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class BoardDto {
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
    private String category;

    public BoardDto(){}

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
                .build();
        return board;
    }

}
