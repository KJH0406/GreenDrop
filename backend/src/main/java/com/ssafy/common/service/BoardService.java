package com.ssafy.common.service;

import com.ssafy.common.config.AppConfig;
import com.ssafy.common.dto.BoardDto;
import com.ssafy.common.dto.request.BoardRequestDto;
import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.BoardCategory;
import com.ssafy.common.entity.Category;
import com.ssafy.common.repository.BoardCategoryRepository;
import com.ssafy.common.repository.BoardRepository;
import com.ssafy.common.repository.CategoryRepository;
import com.ssafy.common.security.Encoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final CategoryRepository categoryRepository;
    private final BoardCategoryRepository boardCategoryRepository;
    private final Encoder encoder;
    private final BoardCategoryService boardCategoryService;
    private final AppConfig appConfig;

    @Transactional
    public void saveBoard(BoardDto boardDto , String ipAdress) {

        boardDto.setIp(ipAdress);
        boardDto.setIsDeleted(0);
        boardDto.setLikeCount(0);
        String encodepwd = encoder.encode(boardDto.getPassword());
        boardDto.setPassword(encodepwd);
        boardDto.setLastmodifiedDate(LocalDateTime.now());
        Board board = boardDto.toEntity();
        boardRepository.save(board);
        String itemNo = boardDto.getCategory();
        Category category = categoryRepository.findByItem(itemNo);
        boardCategoryService.saveBoardAndCategory(category,board);

    }

    public BoardResponseDto detailBoardPage(Long boardId){
        Board board = boardRepository.findById(boardId).get();
        BoardCategory boardCategory = boardCategoryRepository.findBoardCategoryByBoard_BoardSeq(boardId).get(0);
        String item = boardCategory.getCategory().getItem();

        BoardResponseDto boardResponseDto = new BoardResponseDto(board.getQuestion(),board.getLeftAnswer(),board.getRightAnswer(),board.getIp(),board.getNickname(),board.getLikeCount(),item);
        boardResponseDto.fromDetail(board,item);
        return boardResponseDto;
    }

    public boolean checkPasswordUser(Long boardNo, String pwd , String userIp){
        Board board = boardRepository.findById(boardNo).get();
        String encodePassword = board.getPassword();
        boolean passwordMatchResult = encoder.matches(pwd,encodePassword);

        boolean sameUserIp = userIp.equals(board.getIp());

        return (passwordMatchResult == sameUserIp);
    }

    @Transactional
    public void deleteYesBoard(Long boardNo){
        Board board = boardRepository.getReferenceById(boardNo);
        BoardRequestDto boardRequestDto = appConfig.modelMapper().map(board,BoardRequestDto.class);

        boardRequestDto.setIsDeleted(1);
        boardRequestDto.setDeletedDate(LocalDateTime.now());
        Board deleteBoard = boardRequestDto.toEntity();
        boardRepository.save(deleteBoard);
    }

    @Transactional
    public void modifyBoard(Long boardNo , BoardDto boardDto){
        Board board = boardRepository.getReferenceById(boardNo);
        BoardRequestDto originDto = appConfig.modelMapper().map(board,BoardRequestDto.class);

        originDto.setQuestion(boardDto.getQuestion());
        originDto.setLeftAnswer(boardDto.getLeftAnswer());
        originDto.setRightAnswer(boardDto.getRightAnswer());
        originDto.setModified(LocalDateTime.now());

        boardRepository.save(originDto.toEntity());
        Category category = categoryRepository.findByItem(boardDto.getCategory());
        boardCategoryService.saveBoardAndCategory(category,originDto.toEntity());

    }

}
