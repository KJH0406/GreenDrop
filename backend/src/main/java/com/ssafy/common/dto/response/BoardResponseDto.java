package com.ssafy.common.dto.response;

import com.ssafy.common.entity.Board;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

//TODO: record builder 좀더 삽질 필요 아직 사용법을 잘 모르겠음

@Data
@NoArgsConstructor
@Builder
public class BoardResponseDto{

    private Long boardSeq;
    private String question;
    private String leftAnswer;
    private String rightAnswer;
    private String ip;
    private String nickname;
    private Integer likeCount;
    private LocalDateTime lastModifiedDate;
    private String item;
    private Integer commentCount;

    public BoardResponseDto (Long boardSeq,String question, String leftAnswer, String rightAnswer, String ip, String nickname, Integer likeCount ,LocalDateTime lastModifiedDate,String item,Integer commentCount) {
//        return new BoardResponseDto(question, leftAnswer, rightAnswer, ip, nickname, likeCount,lastModifiedDate,item);
    this.boardSeq = boardSeq;
        this.question = question;
    this.leftAnswer = leftAnswer;
    this.rightAnswer = rightAnswer;
    this.ip = ip;
    this.nickname = nickname;
    this.likeCount = likeCount;
    this.lastModifiedDate = lastModifiedDate;
    this.item=item;
    this.commentCount = commentCount;
    }
    public BoardResponseDto fromEntity(Board board, Integer cCount){
        return BoardResponseDto.builder()
                .boardSeq(board.getBoardSeq())
                .question(board.getQuestion())
                .leftAnswer(board.getLeftAnswer())
                .rightAnswer(board.getRightAnswer())
                .ip(board.getIp())
                .nickname(board.getNickname())
                .likeCount(board.getLikeCount())
                .lastModifiedDate(board.getLastModifiedDate())
                .item(item)
                .commentCount(cCount)
                .build();

   }
    public Board toEntity(Long boardSeq){
        return Board.builder()
                .boardSeq(boardSeq)
                .question(question)
                .leftAnswer(leftAnswer)
                .rightAnswer(rightAnswer)
                .build();
   }
}
