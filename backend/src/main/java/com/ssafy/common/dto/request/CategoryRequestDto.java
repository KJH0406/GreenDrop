package com.ssafy.common.dto.request;

import com.ssafy.common.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
