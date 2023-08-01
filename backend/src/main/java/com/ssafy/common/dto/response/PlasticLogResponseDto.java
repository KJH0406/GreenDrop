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
public class PlasticLogResponseDto {
    //leftCount, rightCount만 반환하도록
    //주의 : PlasticLog Entity는 count 갖고있지 않음
    private Integer leftCount;
    private Integer rightCount;

    public static PlasticLogResponseDto fromEntity(Game game){
        return PlasticLogResponseDto.builder()
                .leftCount(game.getLeftCount())
                .rightCount(game.getRightCount())
                .build();
    }
}
