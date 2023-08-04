package com.ssafy.common.repository;

import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board,Long> , BoardRepositoryCustom{
    @Query("select b from Board b where b.isDeleted=0 order by b.boardSeq desc")
    List<Board> findAll();

}
