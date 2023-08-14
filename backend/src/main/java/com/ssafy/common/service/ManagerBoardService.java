package com.ssafy.common.service;

import com.ssafy.common.dto.CommentDto;
import com.ssafy.common.dto.response.BoardDetailResponseDto;
import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.dto.response.CommentResponseDto;
import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.BoardCategory;
import com.ssafy.common.entity.Category;
import com.ssafy.common.entity.Comment;
import com.ssafy.common.repository.BoardCategoryRepository;
import com.ssafy.common.repository.BoardRepository;
import com.ssafy.common.repository.CategoryRepository;
import com.ssafy.common.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ManagerBoardService {
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    private final CategoryRepository categoryRepository;
    private final BoardCategoryRepository boardCategoryRepository;
    private final BoardService boardService;
    private final ModelMapper modelMapper;

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

    public BoardDetailResponseDto getBoardDetail(Long boardNo){
        Board board = boardRepository.findBoardByBoardSeq(boardNo).orElseThrow(
                () -> new IllegalArgumentException("보드 없음")
        );

        List<Comment> comment = commentRepository.findByComment(board.getBoardSeq());

        BoardCategory boardCategory = boardCategoryRepository.findBoardCategoryByBoard_BoardSeq(board.getBoardSeq()).orElseThrow(
                () -> new IllegalArgumentException("보드 카테고리 없음")
        );

        Category category = categoryRepository.findByCategorySeq(boardCategory.getCategory().getCategorySeq()).orElseThrow(
                () -> new IllegalArgumentException("카테고리 없음")
        );

        return BoardDetailResponseDto.builder()
                .boardSeq(board.getBoardSeq())
                .question(board.getQuestion())
                .leftAnswer(board.getLeftAnswer())
                .rightAnswer(board.getRightAnswer())
                .nickname(board.getNickname())
                .likeCount(board.getLikeCount())
                .isDeleted(board.getIsDeleted())
                .deletedDate(board.getDeletedDate())
                .lastModifiedDate(board.getLastModifiedDate())
                .createdDate(board.getCreatedDate())
                .reservationList(board.getReservationList())
                .comment(comment)
                .category(category)
                .build();
    }

    //관리자는 삭제된 댓글도 모두 확인가능
    public List<CommentDto.managerCommentList> getCommentList(Long boardNo) {
        List<Comment> boardComments = commentRepository.findByComment(boardNo);
        List<CommentDto.managerCommentList> resultList = new ArrayList<>();
        for (Comment c : boardComments) {
            if (c.getParentId() == null) {
                List<Comment> cocoment = commentRepository.findByParentId(c.getCommentSeq());
                CommentDto.managerCommentList result;
                result = new CommentDto.managerCommentList(modelMapper.map(c,Comment.class), cocoment);
                resultList.add(result);
            } else break;
        }
        return resultList;
    }

}
