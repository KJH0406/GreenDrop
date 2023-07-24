package com.ssafy.common.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.common.entity.Board;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import static com.ssafy.common.entity.QBoard.board;

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

}
