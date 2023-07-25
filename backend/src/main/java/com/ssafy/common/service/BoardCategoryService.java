package com.ssafy.common.service;

import com.ssafy.common.dto.request.BoardCategoryRequestDto;
import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.BoardCategory;
import com.ssafy.common.entity.Category;
import com.ssafy.common.repository.BoardCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class BoardCategoryService {

    private final BoardCategoryRepository boardCategoryRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public void saveBoardAndCategory(Category category, Board board){
        BoardCategoryRequestDto boardCategoryRequestDto = new BoardCategoryRequestDto();
        boardCategoryRequestDto.setBoard(board);
        boardCategoryRequestDto.setCategory(category);

        boardCategoryRepository.save(boardCategoryRequestDto.toEntity());
    }

    @Transactional
    public void updateBoardAndCategory(Category category, Board board){
        Optional<BoardCategory> isBoardCategoryCheck =
        boardCategoryRepository.findBoardCategoryByBoard_BoardSeq(board.getBoardSeq());

        //DB에 boardPK 없으면 false , 있으면 true
        if(isBoardCategoryCheck.isPresent()){
            BoardCategoryRequestDto boardCategoryRequestDto = modelMapper.map(isBoardCategoryCheck.get(),BoardCategoryRequestDto.class);
            boardCategoryRequestDto.setCategory(category);
            boardCategoryRepository.save(boardCategoryRequestDto.toEntity());
        }
        else {
            saveBoardAndCategory(category,board);
        }

    }

    @Transactional
    public void deleteBoardAndCategory(Board board){
        Optional<BoardCategory> isBoardCategoryCheck =
                boardCategoryRepository.findBoardCategoryByBoard_BoardSeq(board.getBoardSeq());

        if(isBoardCategoryCheck.isPresent()){
            boardCategoryRepository.deleteById(isBoardCategoryCheck.get().getBoardCategorySeq());
        }

    }

}
