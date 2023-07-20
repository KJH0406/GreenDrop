package com.ssafy.common.dto.response;

import com.ssafy.common.entity.Board;

import java.util.List;

public record BoardResponseDto(
        String question,
        String leftAnswer,
        String rightAnswer,
        String ip,
        String nickname,
        Integer likeCount,
        List<String> items
) {
    public BoardResponseDto of(String question, String leftAnswer, String rightAnswer, String ip, String nickname, Integer likeCount , List<String> items) {
        return new BoardResponseDto(question, leftAnswer, rightAnswer, ip, nickname, likeCount,items);
    }
    public BoardResponseDto from(Board board , List<String> items){
       return new BoardResponseDto(
               board.getQuestion(),
               board.getLeftAnswer(),
               board.getRightAnswer(),
               board.getIp(),
               board.getNickname(),
               board.getLikeCount(),
               items
       );
   }
}
