package com.ssafy.common.repository;

import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.entity.Board;

import java.util.List;

public interface BoardRepositoryCustom {

    void updateLikeCount(Board board);
    BoardResponseDto oneBoard(Long boardNo);
    List<BoardResponseDto> searchKeyword(String keyword);
    List<Long> searchCategory(Long categorySeq);
    List<BoardResponseDto> newBoardList();
}
