package com.ssafy.common.service;

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

import java.util.ArrayList;
import java.util.List;

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

    @Transactional
    public void saveBoard(BoardDto boardDto , String ipAdress) {

        boardDto.setIp(ipAdress);
        boardDto.setIsDeleted(0);
        boardDto.setLikeCount(0);
        String encodepwd = encoder.encode(boardDto.getPassword());
        boardDto.setPassword(encodepwd);

        Board board = boardDto.toEntity();
        boardRepository.save(board);
        List<String> categoryList = boardDto.getCategoryList();
        for(String category : categoryList){
            Category item = categoryRepository.findByItem(category);
            boardCategoryService.saveBoardAndCategory(item,board);
        }
    }

    public BoardResponseDto detailBoardPage(Long boardId){
        Board board = boardRepository.findById(boardId).get();
        List<BoardCategory> bcList = boardCategoryRepository.findBoardCategoryByBoard_BoardSeq(boardId);
        List<String> items = new ArrayList<>();
        for ( BoardCategory br : bcList){
            items.add(br.getCategory().getItem());
        }
        BoardResponseDto boardResponseDto = new BoardResponseDto(board.getQuestion(),board.getLeftAnswer(),board.getRightAnswer(),board.getIp(),board.getNickname(),board.getLikeCount(),items);
        boardResponseDto.from(board,items);
        return boardResponseDto;
    }

    public boolean checkPasswordUser(Long boardNo, String pwd , String userIp){
        Board board = boardRepository.findById(boardNo).get();
        String encodePassword = board.getPassword();
        boolean passwordMatchResult = encoder.matches(pwd,encodePassword);

        boolean sameUserIp = userIp.equals(board.getIp());

        return (passwordMatchResult == sameUserIp);
    }


}
