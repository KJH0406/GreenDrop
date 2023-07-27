package com.ssafy.common.controller;

import com.ssafy.common.dto.CommentDto;
import com.ssafy.common.security.UserIp;
import com.ssafy.common.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/comment")
@RestController
public class CommentController {

    private final CommentService commentService;
    private final UserIp userIp;

    @PostMapping("/regist/parent/{boardNo}")
    ResponseEntity<?> registParentComment(
            @PathVariable Long boardNo,
            @RequestBody CommentDto commentDto,
            HttpServletRequest request
            ){

        commentService.saveParentComment(boardNo,userIp.searchIP(request),commentDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/regist/child/{commentNo}")
    ResponseEntity<?> registChildCommenr(
        @PathVariable Long commentNo,
        @RequestBody CommentDto commentDto,
        HttpServletRequest request
    ){
        commentService.saveChildComment(commentNo,userIp.searchIP(request),commentDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    
    @GetMapping("/{boardNo}")
    ResponseEntity<List<CommentDto.commentList>> boardCommentList(@PathVariable Long boardNo){

        return new ResponseEntity<>
                (commentService.getCommentList(boardNo),HttpStatus.OK);
    }
}
