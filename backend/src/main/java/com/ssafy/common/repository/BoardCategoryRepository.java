package com.ssafy.common.repository;

import com.ssafy.common.entity.BoardCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardCategoryRepository extends JpaRepository<BoardCategory,Long> {
    Optional<BoardCategory> findBoardCategoryByBoard_BoardSeq(Long BoardId);
}
