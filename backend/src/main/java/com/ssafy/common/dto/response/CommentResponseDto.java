package com.ssafy.common.dto.response;

import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDto {

    private String content;
    private Long commentSeq;
    private Long board;
    private String nickName;
    private String ip;
    private LocalDateTime createdDate;

    public CommentResponseDto fromComment(Comment comment){
        return CommentResponseDto.builder()
                .commentSeq(comment.getCommentSeq())
                .board(comment.getBoard().getBoardSeq())
                .content(comment.getContent())
                .nickName(comment.getNickName())
                .ip(comment.getIp())
                .createdDate(comment.getCreatedDate())
                .build();
    }

    public static CommentResponseDto fromDeleteComment(String msg){
        return CommentResponseDto.builder()
                .content(msg)
                .build();
    }

}
