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

    @Transactional
    public void categoryUpdate(Long categorySeq, CategoryRequestDto categoryRequestDto){
        String item = categoryRequestDto.getItem();
        Category category = categoryRepository.findByCategorySeq(categorySeq).get();
        Category newCategory = Category.builder()
                .categorySeq(categorySeq)
                .item(item)
                .boardCategories(category.getBoardCategories())
                .build();
        categoryRepository.save(newCategory);
    }

    @Transactional
    public void categoryDelete(Long categorySeq){
        categoryRepository.deleteById(categorySeq);
    }

}
