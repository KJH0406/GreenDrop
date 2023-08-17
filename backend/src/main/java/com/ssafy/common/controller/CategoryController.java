package com.ssafy.common.controller;

import com.ssafy.common.dto.request.CategoryRequestDto;
import com.ssafy.common.entity.Category;
import com.ssafy.common.service.CategoryService;
import com.ssafy.common.dto.CategoryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/category")
@RestController
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/regist")
    public ResponseEntity<Object> saveCategory(@RequestBody CategoryRequestDto categoryRequestDto){
        categoryService.categorySave(categoryRequestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List> categoryList(){
        List<Category> categories = categoryService.categoryList();

        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @PatchMapping("/{categoryNo}")
    public ResponseEntity<Object> categoryUpdate(
            @PathVariable Long categoryNo,
            @RequestBody CategoryDto categoryDto
    ){
        categoryService.categoryUpdate(categoryNo,categoryDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{categoryNo}")
    public ResponseEntity<Object> categoryDelete(@PathVariable Long categoryNo){
        categoryService.categoryDelete(categoryNo);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
