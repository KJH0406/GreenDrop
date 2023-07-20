package com.ssafy.common.service;

import com.ssafy.common.dto.request.BoardCategoryRequestDto;
import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.BoardCategory;
import com.ssafy.common.entity.Category;
import com.ssafy.common.repository.BoardCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class BoardCategoryService {

    private final BoardCategoryRepository boardCategoryRepository;

    @Transactional
    public void saveBoardAndCategory(Category category, Board board){
        BoardCategoryRequestDto boardCategoryRequestDto = new BoardCategoryRequestDto();
        boardCategoryRequestDto.setBoard(board);
        boardCategoryRequestDto.setCategory(category);
        BoardCategory boardCategory = boardCategoryRequestDto.toEntity();

        boardCategoryRepository.save(boardCategory);
    }

}
