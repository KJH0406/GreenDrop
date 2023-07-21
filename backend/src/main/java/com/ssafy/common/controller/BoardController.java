package com.ssafy.common.controller;

import com.ssafy.common.dto.BoardDto;
import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.security.UserIp;
import com.ssafy.common.service.BoardService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/board")
@RestController
public class BoardController {

    private final BoardService boardService;
    private final UserIp userIp;

    @PostMapping("/regist")
    public ResponseEntity<?> registBoard(
            @RequestBody BoardDto boardDto,
            HttpServletRequest request
    ){
        String ipAdress = userIp.searchIP(request);
        boardService.saveBoard(boardDto,ipAdress);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/detail/{boardNo}")
    public ResponseEntity<?> detailBoardPage(@PathVariable Long boardNo){
        BoardResponseDto boardResponseDto  = boardService.detailBoardPage(boardNo);

        return new ResponseEntity<>(boardResponseDto,HttpStatus.OK);
    }

    @PostMapping("/modify/{boardNo}")
    public ResponseEntity<?> checkUserPassword(
            @PathVariable Long boardNo,
            @RequestBody String password,
            HttpServletRequest request
    ) {

        JSONObject parser = new JSONObject(password);
        String  userPassword = parser.getString("password");
        String ipAdress = userIp.searchIP(request);
        Boolean userCheck = boardService.checkPasswordUser(boardNo,userPassword,ipAdress);

        if(!userCheck) {
            //TODO : 비밀번호 불일치 시 Error 처리 예정
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
