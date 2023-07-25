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

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/comment")
@RestController
public class CommentController {

    private final CommentService commentService;
    private final UserIp userIp;

    @PostMapping("/regist/{boardNo}")
    ResponseEntity<?> registParentComment(
            @PathVariable Long boardNo,
            @RequestBody CommentDto commentDto,
            HttpServletRequest request
            ){

        String ipAdress = userIp.searchIP(request);
        commentService.saveParentComment(boardNo,ipAdress,commentDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
