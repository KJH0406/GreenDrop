package com.ssafy.common.dto.response;

import com.ssafy.common.entity.Category;

public record CategoryResponseDto(
        Long categorySeq,
        String item
) {

    public static CategoryResponseDto of(Long categorySeq, String item){
        return new CategoryResponseDto(categorySeq,item);
    }
    public static CategoryResponseDto of(String item) {
        return new CategoryResponseDto(null, item);
    }

    public static CategoryResponseDto from(Category category){
        return new CategoryResponseDto(category.getCategorySeq(), category.getItem());
    }

}
