package com.ssafy.common.service;

import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.Game;
import com.ssafy.common.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class GameService {
    private final GameRepository gameRepository;

    @Transactional
    public void registGame(Long boardSeq){ //boardSeq를 통해 가져온 Board를 통해 Game 등록
        Board board = gameRepository.findByBoard_BoardSeq(boardSeq);
        Game game = Game.builder()
                .board(board)
                .question(board.getQuestion())
                .leftAnswer(board.getLeftAnswer())
                .rightAnswer(board.getRightAnswer())
                .date(LocalDate.now())
                .createdDate(LocalDateTime.now())
                .leftCount(0)
                .rightCount(0)
                .build();
        gameRepository.save(game);
    }

    public List<Game> findAllGameList(){
        List<Game> gameList = gameRepository.findAll();
        Collections.sort(gameList, Collections.reverseOrder());
        return gameList;
    }

    public Game findGameByDate(LocalDate date){
        return gameRepository.findGameByDate(date);
    }


}
