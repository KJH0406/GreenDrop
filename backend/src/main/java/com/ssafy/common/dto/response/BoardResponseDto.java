package com.ssafy.common.dto.response;

import com.ssafy.common.entity.Board;

public record BoardResponseDto(
        String question,
        String leftAnswer,
        String rightAnswer,
        String ip,
        String nickname,
        Integer likeCount,
        String item
) {
    public BoardResponseDto of(String question, String leftAnswer, String rightAnswer, String ip, String nickname, Integer likeCount ,String item) {
        return new BoardResponseDto(question, leftAnswer, rightAnswer, ip, nickname, likeCount,item);
    }
    public BoardResponseDto from(Board board , String item){
       return new BoardResponseDto(
               board.getQuestion(),
               board.getLeftAnswer(),
               board.getRightAnswer(),
               board.getIp(),
               board.getNickname(),
               board.getLikeCount(),
               item
       );
   }
}
