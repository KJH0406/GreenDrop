package com.ssafy.common.service;

import com.ssafy.common.dto.CommentDto;
import com.ssafy.common.entity.Comment;
import com.ssafy.common.repository.BoardRepository;
import com.ssafy.common.repository.CommentRepository;
import com.ssafy.common.security.Encoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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

        if(commentDto.getPassword() != null) {
            String encodepwd = encoder.encode(commentDto.getPassword());
            commentDto.setPassword(encodepwd);
        }
        commentDto.setBoard(boardRepository.getReferenceById(boardNo));
        commentRepository.save(commentDto.toEntity());

    }

    @Transactional
    public void saveChildComment(Long commentNo, String ip, CommentDto commentDto){

        commentDto.setIp(ip);
        commentDto.setIsChild(1);
        if(commentDto.getPassword() != null) {
            String encodepwd = encoder.encode(commentDto.getPassword());
            commentDto.setPassword(encodepwd);
        }
        commentDto.setParentId(commentNo);
        commentDto.setBoard(commentRepository.getReferenceById(commentNo).getBoard());
        commentRepository.save(commentDto.toEntity());

    }

        public List<CommentDto.commentList> getCommentList(Long boardNo){

        List<Comment> boardComments = commentRepository.findByComment(boardNo);
            List<CommentDto.commentList> resultList = new ArrayList<>();
        for (Comment c : boardComments){
            if(c.getParentId() == null) {
                List<Comment> cocoment = commentRepository.findByParentId(c.getCommentSeq());
                CommentDto.commentList result = new CommentDto.commentList(c,cocoment);
                resultList.add(result);
            }
            else break;
        }
        return resultList;
    }
}
