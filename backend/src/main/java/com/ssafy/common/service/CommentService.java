package com.ssafy.common.service;

import com.ssafy.common.dto.CommentDto;
import com.ssafy.common.dto.response.CommentResponseDto;
import com.ssafy.common.entity.Comment;
import com.ssafy.common.repository.BoardRepository;
import com.ssafy.common.repository.CommentRepository;
import com.ssafy.common.security.Encoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class CommentService {

    private static final String DELETE_MESSAGE = "삭제된 댓글 입니다";
    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final Encoder encoder;
    private final ModelMapper modelMapper;

    @Transactional
    public void saveParentComment(Long boardNo, String ip, CommentDto commentDto) {

        commentDto.setIp(ip);
        commentDto.setIsChild(0);
        commentDto.setCreatedDate(LocalDateTime.now());

        if (commentDto.getPassword() != null) {
            String encodepwd = encoder.encode(commentDto.getPassword());
            commentDto.setPassword(encodepwd);
        }
        commentDto.setBoard(boardRepository.getReferenceById(boardNo));
        commentRepository.save(commentDto.toEntity());

    }

    @Transactional
    public void saveChildComment(Long commentNo, String ip, CommentDto commentDto) {

        commentDto.setIp(ip);
        commentDto.setIsChild(1);
        commentDto.setCreatedDate(LocalDateTime.now());
        if (commentDto.getPassword() != null) {
            String encodepwd = encoder.encode(commentDto.getPassword());
            commentDto.setPassword(encodepwd);
        }
        commentDto.setParentId(commentNo);
        commentDto.setBoard(commentRepository.getReferenceById(commentNo).getBoard());
        commentRepository.save(commentDto.toEntity());

    }

    public List<CommentDto.commentList> getCommentList(Long boardNo) {

        List<Comment> boardComments = commentRepository.findByComment(boardNo);
        List<CommentDto.commentList> resultList = new ArrayList<>();
        for (Comment c : boardComments) {
            if (c.getParentId() == null) {
                List<Comment> cocoment = commentRepository.findByParentId(c.getCommentSeq());
                List<CommentResponseDto> changeDto = new ArrayList<>();
                for(Comment coco : cocoment) {
                    CommentResponseDto crd;
                    if(coco.getIsDeleted() == 0) {
                         crd = modelMapper.map(coco,CommentResponseDto.class);
                    }
                    else{
                        crd = CommentResponseDto.fromDeleteComment(DELETE_MESSAGE);
                    }

                    changeDto.add(crd);
                }
                CommentDto.commentList result;
                if(c.getIsDeleted() == 0) {
                    result = new CommentDto.commentList(modelMapper.map(c,CommentResponseDto.class), changeDto);
                }
                 else {
                     result = new CommentDto.commentList(CommentResponseDto.fromDeleteComment(DELETE_MESSAGE), changeDto);

                }
                resultList.add(result);
            } else break;
        }
        return resultList;
    }

    @Transactional
    public void deleteComment(Long commentNo) {
        Comment comment = commentRepository.getReferenceById(commentNo);

        Comment deleteComment = Comment.builder()
                .isDeleted(1)
                .deletedDateTime(LocalDateTime.now())
                .ip(comment.getIp())
                .createdDate(comment.getCreatedDate())
                .password(comment.getPassword())
                .nickName(comment.getNickName())
                .commentSeq(commentNo)
                .isChild(comment.getIsChild())
                .parentId(comment.getParentId())
                .content(comment.getContent())
                .board(comment.getBoard())
                .build();

        commentRepository.save(deleteComment);
    }

    public Integer checkPasswordUser(Long commentNo, String pwd){
        Comment comment = commentRepository.getReferenceById(commentNo);
        String encodePassword = comment.getPassword();
        boolean passwordMatchResult = encoder.matches(pwd,encodePassword);

        //if(!passwordResult){
        //TODO : 에러처리 예정 (Exception 핸들러 구현 후 작성 예정)
        //}
        if(passwordMatchResult == true){
            return 1;
        }
        else {
            return 2;
        }

    }
    
}
