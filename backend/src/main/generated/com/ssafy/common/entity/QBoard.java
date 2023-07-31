package com.ssafy.common.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBoard is a Querydsl query type for Board
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoard extends EntityPathBase<Board> {

    private static final long serialVersionUID = -245091433L;

    public static final QBoard board = new QBoard("board");

    public final ListPath<BoardCategory, QBoardCategory> boardCategories = this.<BoardCategory, QBoardCategory>createList("boardCategories", BoardCategory.class, QBoardCategory.class, PathInits.DIRECT2);

    public final NumberPath<Long> boardSeq = createNumber("boardSeq", Long.class);

    public final ListPath<Comment, QComment> commentList = this.<Comment, QComment>createList("commentList", Comment.class, QComment.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> deletedDate = createDateTime("deletedDate", java.time.LocalDateTime.class);

    public final StringPath ip = createString("ip");

    public final NumberPath<Integer> isDeleted = createNumber("isDeleted", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = createDateTime("lastModifiedDate", java.time.LocalDateTime.class);

    public final StringPath leftAnswer = createString("leftAnswer");

    public final NumberPath<Integer> likeCount = createNumber("likeCount", Integer.class);

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final StringPath question = createString("question");

    public final StringPath rightAnswer = createString("rightAnswer");

    public QBoard(String variable) {
        super(Board.class, forVariable(variable));
    }

    public QBoard(Path<? extends Board> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBoard(PathMetadata metadata) {
        super(Board.class, metadata);
    }

}

