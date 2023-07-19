package com.ssafy.common.controller;

import com.ssafy.common.dto.request.CategoryRequestDto;
import com.ssafy.common.entity.Category;
import com.ssafy.common.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/category")
@RestController
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/regist")
    public ResponseEntity<?> saveCategory(@RequestBody CategoryRequestDto categoryRequestDto){
        categoryService.categorySave(categoryRequestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List> categoryList(){
        List<Category> categories = categoryService.categoryList();

        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

}
