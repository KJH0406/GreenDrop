package com.ssafy.common.controller;

import com.ssafy.common.dto.BoardDto;
import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.entity.Board;
import com.ssafy.common.security.UserIp;
import com.ssafy.common.service.BoardService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/board")
@RestController
public class BoardController {

    private final BoardService boardService;
    private final UserIp userIp;

    @PostMapping("/regist")
    public ResponseEntity<Object> registBoard(
            @RequestBody BoardDto boardDto,
            HttpServletRequest request
    ){
        String ipAdress = userIp.searchIP(request);
        boardService.saveBoard(boardDto,ipAdress);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/detail/{boardNo}")
    public ResponseEntity<BoardResponseDto> detailBoardPage(@PathVariable Long boardNo){
        BoardResponseDto boardResponseDto  = boardService.detailBoardPage(boardNo);

        return new ResponseEntity<>(boardResponseDto,HttpStatus.OK);
    }

    @PostMapping("/modify/{boardNo}")
    public ResponseEntity<Object> checkUserPassword(
            @PathVariable Long boardNo,
            @RequestBody String password,
            HttpServletRequest request
    ) {

        if(!boardService.userPasswordExistCheck(boardNo)){
            //TODO : log 내용 Error handler로 뺄 예정
            log.info("게시글 등록 시 비밀번호를 입력하지 않은 게시물이라 접근 권한이 없습니다.");
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        JSONObject parser = new JSONObject(password);
        Boolean userCheck =
            boardService.checkPasswordUser(boardNo,parser.getString("password"),userIp.searchIP(request));

        if(!userCheck) {
            //TODO : 비밀번호 불일치 시 Error 처리 예정 -> Service단으로 Custom Error class 생성 후 이동예정
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/delete/{boardNo}")
    public ResponseEntity<Object> deleteYesBoard(
            @PathVariable Long boardNo
    ){
        boardService.deleteYesBoard(boardNo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/modify/{boardNo}")
    public ResponseEntity<Object> modifyBoard(@PathVariable Long boardNo, @RequestBody BoardDto boardDto){

        boardService.modifyBoard(boardNo,boardDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PatchMapping("/like/{boardNo}")
    public ResponseEntity<Object> boardLikeUp(@PathVariable Long boardNo){

        boardService.infinityLikeBoard(boardNo);

        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("/list")
    public ResponseEntity<List<BoardResponseDto>> allBoardList(){
        List<BoardResponseDto> boardList = boardService.findAllNew();
        return new ResponseEntity<>(boardList,HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<BoardResponseDto>> searchBoard(
            @RequestParam String question
    ) {
        List<BoardResponseDto> searchKeywords = boardService.searchKeyword(question);
        return new ResponseEntity<>(searchKeywords,HttpStatus.OK);
    }

    @GetMapping("/select")
    public ResponseEntity<?> searchCategory(
            @PageableDefault(size = 5) Pageable pageable,
            @RequestParam String category
    ){
        Page<BoardResponseDto> boardResponseDtoPage = boardService.searchCategory(category,pageable);

        return new ResponseEntity<>(boardResponseDtoPage,HttpStatus.OK);
    }

    @GetMapping("/like/list")
    public ResponseEntity<List<BoardResponseDto>> likeBoardList(){
        return new ResponseEntity<>(boardService.likeCountList(),HttpStatus.OK);
    }

}
