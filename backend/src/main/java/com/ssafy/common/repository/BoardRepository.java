package com.ssafy.common.repository;

import com.ssafy.common.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board,Long> , BoardRepositoryCustom{
    Optional<Board> findBoardByBoardSeq(Long boardSeq);
}
