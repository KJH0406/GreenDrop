package com.ssafy.common.dto.response;

import com.ssafy.common.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDto {

    private String content;
    private String nickName;
    private String ip;

    public CommentResponseDto fromComment(Comment comment){
        return CommentResponseDto.builder()
                .content(comment.getContent())
                .nickName(comment.getNickName())
                .ip(comment.getIp())
                .build();
    }

    public static CommentResponseDto fromDeleteComment(String msg){
        return CommentResponseDto.builder()
                .content(msg)
                .build();
    }

}
