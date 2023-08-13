package com.ssafy.common.controller;

import com.ssafy.common.dto.CommentDto;
import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.entity.Board;
import com.ssafy.common.service.BoardService;
import com.ssafy.common.service.CommentService;
import com.ssafy.common.service.ManagerBoardService;
import com.ssafy.common.service.ManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api/managerboard")
@RestController
public class ManagerBoardController {
    private final ManagerBoardService managerBoardService;
    private final BoardService boardService;
    private final CommentService commentService;

    @PatchMapping("/deleteBoard")
    public ResponseEntity<Object> deleteBoard(@RequestBody Map<String, Long> boardInfo){
        long boardSeq = boardInfo.get("boardSeq");
        boardService.deleteYesBoard(boardSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/deleteComment")
    public ResponseEntity<Object> deleteComment(@RequestBody Map<String, Long> commentInfo){
        long commentSeq = commentInfo.get("commentSeq");
        commentService.deleteComment(commentSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<Object> getBoardList(@RequestParam(value = "order", required = false) String order,
                                               @RequestParam(value = "categorySeq", required = false) long categorySeq,
                                               @RequestParam(value = "deleteView", required = false) boolean deleteView){

        List<BoardResponseDto> boardList = managerBoardService.getBoardList(order, categorySeq, deleteView);
        return new ResponseEntity<>(boardList, HttpStatus.OK);
    }

    @GetMapping("/comments/{boardNo}")
    ResponseEntity<List<CommentDto.managerCommentList>> boardCommentList(@PathVariable Long boardNo){
        return new ResponseEntity<>(managerBoardService.getCommentList(boardNo),HttpStatus.OK);
    }

    @GetMapping("/boardDetail/{boardNo}")
    ResponseEntity<Board> getBoardDetail(@PathVariable Long boardNo){
        return new ResponseEntity<>(managerBoardService.getBoardDetail(boardNo), HttpStatus.OK);
    }

}
