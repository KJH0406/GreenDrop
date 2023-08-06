package com.ssafy.common.dto.request;

import com.ssafy.common.entity.Category;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class CategoryRequestDto {

    private Long categorySeq;
    private String item;

    public Category toEntity(){
        Category category = Category.builder()
                .categorySeq(categorySeq)
                .item(item)
                .createdDate(LocalDateTime.now())
                .build();
        return category;
    }

}
