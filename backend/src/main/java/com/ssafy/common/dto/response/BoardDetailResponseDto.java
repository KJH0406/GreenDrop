package com.ssafy.common.dto.response;

import com.ssafy.common.entity.Category;
import com.ssafy.common.entity.Comment;
import com.ssafy.common.entity.Reservation;
import jakarta.persistence.Column;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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
    private List<Reservation> reservationList;
    private Category category;
}
