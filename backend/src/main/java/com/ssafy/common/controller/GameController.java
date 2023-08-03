package com.ssafy.common.controller;

import com.ssafy.common.entity.Game;
import com.ssafy.common.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/game")
@RestController
public class GameController {
    private final GameService gameService;

    @PostMapping("/regist/{boardNo}")
    public ResponseEntity<Object> registGame(@PathVariable Long boardNo){
        gameService.registGame(boardNo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List> allGameList(){
        List<Game> gameList = gameService.findAllGameList();

        return new ResponseEntity<>(gameList, HttpStatus.OK);
    }

    @GetMapping("/{date}")
    public ResponseEntity<Game> getGameByDate(@PathVariable LocalDate date){
        Game game = gameService.findGameByDate(date);
        return new ResponseEntity<>(game, HttpStatus.OK);
    }
}
