package com.ssafy.common.service;

import com.ssafy.common.dto.CommentDto;
import com.ssafy.common.entity.Board;
import com.ssafy.common.repository.BoardRepository;
import com.ssafy.common.repository.CommentRepository;
import com.ssafy.common.security.Encoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final Encoder encoder;

    @Transactional
    public void saveParentComment(Long boardNo, String ip, CommentDto commentDto){

        commentDto.setIp(ip);
        commentDto.setIsChild(0);
        String encodepwd = encoder.encode(commentDto.getPassword());
        commentDto.setIsDeleted(0);
        commentDto.setNickName(commentDto.getNickName());
        commentDto.setPassword(encodepwd);
        log.info("boardNo 값 확인 : {} ",boardNo);
        commentDto.setBoard(boardRepository.getReferenceById(boardNo));
        commentRepository.save(commentDto.toEntity());


    }


}
