package com.ssafy.common.service;

import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.Category;
import com.ssafy.common.entity.Comment;
import com.ssafy.common.repository.BoardRepository;
import com.ssafy.common.repository.CategoryRepository;
import com.ssafy.common.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ManagerBoardService {
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final CategoryRepository categoryRepository;
    private final BoardService boardService;

    //order : defalut = "default", dateOld, dateNew, like, category
    //deleteView : true시 삭제된 게시글도 보기(default)
    public List<BoardResponseDto> getBoardList(String order, long categorySeq, boolean deleteView){
        List<BoardResponseDto> boardList;
        switch (order){
            case "dateOld":
                boardList = boardRepository.oldBoardList(deleteView);
                break;
            case "dateNew":
                if(deleteView){
                    boardList = boardRepository.newBoardDeleteViewList();
                }
                else{
                    boardList = boardRepository.newBoardList();
                }
                break;
            case "like":
                if(deleteView){
                    boardList = boardRepository.orderByLikeDeleteViewList();
                }
                else{
                    boardList = boardRepository.orderByLikeList();
                }
                break;
            case "category":
                if(categorySeq != 0){
                    Category category = categoryRepository.findByCategorySeq(categorySeq).get();
                    boardList = boardService.searchCategory(category.getItem());
                }
                else{
                    boardList = boardRepository.newBoardList();
                }
                break;
            default:
                boardList = boardRepository.newBoardList();
                break;
        }
        return boardList;
    }


}
