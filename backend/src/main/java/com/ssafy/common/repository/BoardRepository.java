package com.ssafy.common.repository;

import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board,Long> , BoardRepositoryCustom{
    List<Board> findAll();
}
