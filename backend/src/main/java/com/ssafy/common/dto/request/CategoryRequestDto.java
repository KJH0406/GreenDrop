package com.ssafy.common.dto.request;

import com.ssafy.common.entity.Category;
import lombok.*;

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
                .build();
        return category;
    }

}
