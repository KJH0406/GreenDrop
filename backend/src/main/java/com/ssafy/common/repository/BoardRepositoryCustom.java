package com.ssafy.common.repository;

import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardRepositoryCustom {

    void updateLikeCount(Board board);
    Page<BoardResponseDto> allBoardList(Pageable pageable);
    BoardResponseDto oneBoard(Long boardNo);
    Page<BoardResponseDto> searchKeyword(String keyword, Pageable pageable);
}
