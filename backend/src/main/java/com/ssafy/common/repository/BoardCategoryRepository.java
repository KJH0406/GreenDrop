package com.ssafy.common.repository;

import com.ssafy.common.entity.BoardCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardCategoryRepository extends JpaRepository<BoardCategory,Long> {
    List<BoardCategory> findBoardCategoryByBoard_BoardSeq(Long BoardId);
}
