package com.ssafy.common.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.common.entity.Comment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.common.entity.QComment.comment;

@Slf4j
@Repository
public class CommentRepositoryImpl extends QuerydslRepositorySupport implements CommentRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public CommentRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        super(Comment.class);
        this.queryFactory = jpaQueryFactory;
    }

    @Override
    public List<Comment> findByComment(Long boardNo) {
        return queryFactory.selectFrom(comment)
                .where(comment.board.boardSeq.eq(boardNo))
                .orderBy(comment.parentId.asc().nullsFirst())
                .fetch();
    }

    @Override
    public List<Comment> findByParentId(Long parentId) {
        return queryFactory.selectFrom(comment)
                .where(comment.parentId.eq(parentId))
                .fetch();
    }
    @Override
    public List<Comment> noDeletedComment(Long boardNo) {
        return queryFactory.selectFrom(comment)
                .where(comment.isDeleted.eq(0).and(comment.board.boardSeq.eq(boardNo)))
                .fetch();
    }
}
