package com.ssafy.common.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.BoardCategory;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

//TODO: record builder 좀더 삽질 필요 아직 사용법을 잘 모르겠음

@Data
@NoArgsConstructor (access = AccessLevel.PROTECTED)
@Builder
public class BoardResponseDto{

    private String question;
    private String leftAnswer;
    private String rightAnswer;
    private String ip;
    private String nickname;
    private Integer likeCount;
    private LocalDateTime lastModifiedDate;
    private String item;

    public BoardResponseDto (String question, String leftAnswer, String rightAnswer, String ip, String nickname, Integer likeCount ,LocalDateTime lastModifiedDate,String item) {
//        return new BoardResponseDto(question, leftAnswer, rightAnswer, ip, nickname, likeCount,lastModifiedDate,item);
    this.question = question;
    this.leftAnswer = leftAnswer;
    this.rightAnswer = rightAnswer;
    this.ip = ip;
    this.nickname = nickname;
    this.likeCount = likeCount;
    this.lastModifiedDate = lastModifiedDate;
    this.item=item;
    }
    public BoardResponseDto fromEntity(Board board, String item){
        return BoardResponseDto.builder()
                .question(board.getQuestion())
                .leftAnswer(board.getLeftAnswer())
                .rightAnswer(board.getRightAnswer())
                .ip(board.getIp())
                .nickname(board.getNickname())
                .likeCount(board.getLikeCount())
                .lastModifiedDate(board.getLastModifiedDate())
                .item(item)
                .build();

   }
}
