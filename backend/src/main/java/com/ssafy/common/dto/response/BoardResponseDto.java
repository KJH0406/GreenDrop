package com.ssafy.common.dto.response;

import com.ssafy.common.entity.Board;
import io.soabase.recordbuilder.core.RecordBuilder;

@RecordBuilder //TODO: record builder 좀더 삽질 필요 아직 사용법을 잘 모르겠음
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
    public BoardResponseDto fromDetail(Board board , String item){
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
