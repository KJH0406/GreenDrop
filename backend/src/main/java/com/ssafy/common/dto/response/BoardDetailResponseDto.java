package com.ssafy.common.dto.response;

import com.ssafy.common.entity.Category;
import com.ssafy.common.entity.Comment;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@RequiredArgsConstructor
public class BoardDetailResponseDto {
    private Long boardSeq;

    private String question;
    private String leftAnswer;
    private String rightAnswer;
    private String nickname;
    private Integer likeCount;
    private Integer isDeleted;
    private LocalDateTime deletedDate;
    private LocalDateTime lastModifiedDate;
    private LocalDateTime createdDate;
    private List<Comment> comment;
    private Category category;

}
