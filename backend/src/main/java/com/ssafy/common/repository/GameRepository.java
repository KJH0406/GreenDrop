package com.ssafy.common.repository;

import com.ssafy.common.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long>, GameRepositoryCustom {
    //TODO: GameRepositoryImpl에서 QueryDsl을 통해 상세 쿼리 작성하기?
//    Optional<Game> findOneByDate(LocalDate date); //등록 일자를 통해 게임 조회

    List<Game> findByDate(LocalDate date);

    List<Game> findAll();


}
