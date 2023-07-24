package com.ssafy.common.service;

import com.ssafy.common.dto.request.CategoryRequestDto;
import com.ssafy.common.entity.Category;
import com.ssafy.common.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional
    public void categorySave(CategoryRequestDto categoryRequestDto){
        Category category = categoryRequestDto.toEntity();
        categoryRepository.save(category);
    }


    public List<Category> categoryList(){
        List<Category> categories = categoryRepository.findAll();
        return categories;
    }

}
