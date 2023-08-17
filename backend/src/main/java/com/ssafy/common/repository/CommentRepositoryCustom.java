package com.ssafy.common.repository;

import com.ssafy.common.entity.Comment;

import java.util.List;

public interface CommentRepositoryCustom {

    List<Comment> findByComment(Long boardNo);
    List<Comment> findByParentId(Long parentId);

    List<Comment> noDeletedComment(Long boardNo);

}
