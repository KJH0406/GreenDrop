package com.ssafy.common.dto.response;

import com.ssafy.common.entity.Game;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameResponseDto {
    private String question;
    private String leftAnswer;
    private String rightAnswer;
    private Integer leftCount;
    private Integer rightCount;


    public GameResponseDto fromEntity(Game game){
        return GameResponseDto.builder()
                .question(game.getQuestion())
                .leftAnswer(game.getLeftAnswer())
                .rightAnswer(game.getRightAnswer())
                .leftCount(game.getLeftCount())
                .rightCount(game.getRightCount())
                .build();
    }

}
