package com.ssafy.common.dto;

import com.ssafy.common.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDto {

    private Long categorySeq;
    private String item;
    private LocalDateTime createdDate;

    public Category toEntity(){
        return Category.builder()
                .categorySeq(categorySeq)
                .item(item)
                .createdDate(LocalDateTime.now())
                .build();
    }

    public static CategoryDto updateDto(Long newCategorySeq,CategoryDto newCategoryDto){
        return CategoryDto.builder()
                .categorySeq(newCategorySeq)
                .item(newCategoryDto.getItem())
                .createdDate(newCategoryDto.getCreatedDate())
                .build();
    }
}