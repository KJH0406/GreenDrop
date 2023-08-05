package com.ssafy.common.service;

import com.ssafy.common.dto.BoardDto;
import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.entity.Board;
import com.ssafy.common.entity.Category;
import com.ssafy.common.entity.Comment;
import com.ssafy.common.repository.BoardRepository;
import com.ssafy.common.repository.CategoryRepository;
import com.ssafy.common.repository.CommentRepository;
import com.ssafy.common.security.Encoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final CategoryRepository categoryRepository;
    private final Encoder encoder;
    private final BoardCategoryService boardCategoryService;
    private final ModelMapper modelMapper;
    private final CommentService commentService;
    private final CommentRepository commentRepository;

    @Transactional
    public void saveBoard(BoardDto boardDto , String ipAdress) {

        boardDto.setIp(ipAdress);
        if(boardDto.getPassword() != null) {
            String encodepwd = encoder.encode(boardDto.getPassword());
            boardDto.setPassword(encodepwd);
        }
        boardDto.setLastmodifiedDate(LocalDateTime.now());
        Board board = boardDto.toEntity();
        boardRepository.save(board);

        Optional<Category> category = categoryRepository.findByItem(boardDto.getCategory());
        if(category.isPresent()){
            boardCategoryService.saveBoardAndCategory(category.get(),board);
        }

    }

    public BoardResponseDto detailBoardPage(Long boardId){
        return boardRepository.oneBoard(boardId);
    }

    public boolean checkPasswordUser(Long boardNo, String pwd , String userIp){
        Board board = boardRepository.findById(boardNo).get();
        String encodePassword = board.getPassword();
        boolean passwordMatchResult = encoder.matches(pwd,encodePassword);

        boolean sameUserIp = userIp.equals(board.getIp());

        //if(!passwordResult){
        //TODO : 에러처리 예정 (Exception 핸들러 구현 후 작성 예정)
        //}
        return (passwordMatchResult == sameUserIp);
    }

    @Transactional
    public void deleteYesBoard(Long boardNo){
        Board board = boardRepository.getReferenceById(boardNo);
        BoardDto boardDto = modelMapper.map(board,BoardDto.class);

        boardDto.setIsDeleted(1);
        boardDto.setDeletedDate(LocalDateTime.now());
        boardRepository.save(boardDto.toEntity());

        AllDeleteComment(boardNo);
    }

    public void AllDeleteComment(Long boardNo){
        List<Comment> commentList = commentRepository.findByComment(boardNo);
        for (Comment comment : commentList) {
            commentService.deleteComment(comment.getCommentSeq());
        }
    }

    @Transactional
    public void modifyBoard(Long boardNo , BoardDto boardDto){
        Board board = boardRepository.getReferenceById(boardNo);
        BoardDto originDto = modelMapper.map(board,BoardDto.class);

        originDto.setQuestion(boardDto.getQuestion());
        originDto.setLeftAnswer(boardDto.getLeftAnswer());
        originDto.setRightAnswer(boardDto.getRightAnswer());
        originDto.setLastmodifiedDate(LocalDateTime.now());

        boardRepository.save(originDto.toEntity());

        Optional<Category> category = categoryRepository.findByItem(boardDto.getCategory());

        if(category.isPresent()){
            boardCategoryService.updateBoardAndCategory(category.get(),originDto.toEntity());
        }
        else {
            boardCategoryService.deleteBoardAndCategory(board);
        }

    }

    @Transactional
    public void infinityLikeBoard(Long boardNo){
        Board board = boardRepository.getReferenceById(boardNo);
        boardRepository.updateLikeCount(board);
    }

    public List<BoardResponseDto> searchKeyword(String keyword){
        return boardRepository.searchKeyword(keyword);
    }

    public Page<BoardResponseDto> searchCategory(String item, Pageable pageable){
        Long categoryNum = categoryRepository.findByItem(item).orElseThrow().getCategorySeq();
        List<Long> boardList = boardRepository.searchCategory(categoryNum);

        List<BoardResponseDto> resultBoard = new ArrayList<>();
        for (Long boardNum : boardList){
            Board board = boardRepository.getReferenceById(boardNum);
            BoardResponseDto boardResponseDto = modelMapper.map(board, BoardResponseDto.class);
            boardResponseDto.setItem(item);
            resultBoard.add(boardResponseDto);
        }

        return new PageImpl<>(resultBoard, pageable,resultBoard.size());
    }

    public boolean userPasswordExistCheck(Long boardNo){
        String password = boardRepository.getReferenceById(boardNo).getPassword();

        if(password == null){
            return false;
        }
        return true;
    }

    public List<BoardResponseDto> findAllNew() {
        return boardRepository.newBoardList();
    }

}
