package com.ssafy.common.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.common.dto.response.BoardResponseDto;
import com.ssafy.common.entity.Board;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.common.entity.QBoard.board;
import static com.ssafy.common.entity.QBoardCategory.boardCategory;
import static com.ssafy.common.entity.QCategory.category;

@Slf4j
@Repository
public class BoardRepositoryImpl extends QuerydslRepositorySupport implements BoardRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    public BoardRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        super(Board.class);
        this.queryFactory = jpaQueryFactory;
    }

    @Override
    public void updateLikeCount(Board boardEntity) {
        queryFactory.update(board)
                .set(board.likeCount, board.likeCount.add(1))
                .where(board.eq(boardEntity))
                .execute();
    }

    @Override
    public BoardResponseDto oneBoard(Long boardNo) {
        List<BoardResponseDto> query = queryFactory
                .select(Projections.fields(BoardResponseDto.class,
                        board.question,board.leftAnswer,board.rightAnswer, board.ip,board.likeCount
                        ,board.nickname,board.lastModifiedDate,category.item))
                .from(board)
                .leftJoin(board.boardCategories,boardCategory)
                .leftJoin(boardCategory.category,category)
                .where(board.boardSeq.eq(boardNo)).fetch();

        return query.get(0);
    }

    @Override
    public List<BoardResponseDto> searchKeyword(String keyword) {
       List<BoardResponseDto> query = queryFactory
                .select(Projections.fields(BoardResponseDto.class,
                        board.boardSeq,
                        board.question, board.leftAnswer, board.rightAnswer,board.nickname,
                        board.lastModifiedDate,board.likeCount,category.item))
                .from(board)
                .leftJoin(board.boardCategories,boardCategory)
                .leftJoin(boardCategory.category,category)
                .where(containKeyword(keyword),board.isDeleted.eq(0))
                .orderBy(board.boardSeq.desc()).fetch();

        return query;
    }

    @Override
    public List<Long> searchCategory(Long categorySeq) {

        List<Long> boardSeqList = queryFactory
                .select(boardCategory.board.boardSeq)
                .from(boardCategory)
                .where(boardCategory.category.categorySeq.eq(categorySeq),board.isDeleted.eq(0))
                .fetch();

        return boardSeqList;
    }

    @Override
    public List<BoardResponseDto> newBoardList() {

        List<BoardResponseDto> query = queryFactory
                .select(Projections.fields(BoardResponseDto.class,
                        board.boardSeq,
                        board.question,board.leftAnswer,board.rightAnswer, board.ip,board.likeCount
                        ,board.nickname,board.lastModifiedDate,category.item))
                .from(board)
                .leftJoin(board.boardCategories,boardCategory)
                .leftJoin(boardCategory.category,category)
                .where(board.isDeleted.eq(0))
                .orderBy(board.boardSeq.desc()).fetch();

        return query;
    }

    @Override
    public List<BoardResponseDto> orderByLikeList() {
        List<BoardResponseDto> query = queryFactory
                .select(Projections.fields(BoardResponseDto.class,
                        board.boardSeq,
                        board.question,board.leftAnswer,board.rightAnswer, board.ip,board.likeCount
                        ,board.nickname,board.lastModifiedDate,category.item))
                .from(board)
                .leftJoin(board.boardCategories,boardCategory)
                .leftJoin(boardCategory.category,category)
                .where(board.isDeleted.eq(0))
                .orderBy(board.likeCount.desc()).fetch();

        return query;
    }

    private BooleanExpression containKeyword(String keyword) {
        return board.question.containsIgnoreCase(keyword);
    }
}
