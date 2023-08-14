package com.ssafy.common.repository;

import com.ssafy.common.dto.response.BoardDetailResponseDto;
import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.entity.Board;

import java.util.List;

public interface BoardRepositoryCustom {

    void updateLikeCount(Board board);
    BoardResponseDto oneBoard(Long boardNo);
    BoardDetailResponseDto oneBoardWithCategory(Long boardNo);
    List<BoardResponseDto> searchKeyword(String keyword);
    List<Long> searchCategory(Long categorySeq);
    List<BoardResponseDto> newBoardList();
    List<BoardResponseDto> orderByLikeList();
    List<BoardResponseDto> newBoardDeleteViewList();

    List<BoardResponseDto> oldBoardList(boolean deleteView);

    List<BoardResponseDto> orderByLikeDeleteViewList();

}
