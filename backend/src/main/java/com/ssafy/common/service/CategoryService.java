package com.ssafy.common.service;

import com.ssafy.common.dto.request.CategoryRequestDto;
import com.ssafy.common.entity.Category;
import com.ssafy.common.repository.CategoryRepository;
import com.ssafy.common.dto.CategoryDto;
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

    @Transactional
    public void categoryUpdate(Long categorySeq, CategoryDto categoryDto){
        categoryRepository.save(CategoryDto.updateDto(categorySeq,categoryDto).toEntity());
    }

    @Transactional
    public void categoryDelete(Long categorySeq){
        categoryRepository.deleteById(categorySeq);
    }

}
