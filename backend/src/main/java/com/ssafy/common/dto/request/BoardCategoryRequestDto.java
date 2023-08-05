package com.ssafy.common.dto.request;

import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.BoardCategory;
import com.ssafy.common.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardCategoryRequestDto {

    private Long boardCategorySeq;
    private Board board;
    private LocalDateTime createdDate;
    private Category category;

    public BoardCategory toEntity(){
        BoardCategory boardCategory = BoardCategory.builder()
                .boardCategorySeq(boardCategorySeq)
                .board(board)
                .createdDate(createdDate)
                .category(category)
                .build();

        return boardCategory;
    }

}
