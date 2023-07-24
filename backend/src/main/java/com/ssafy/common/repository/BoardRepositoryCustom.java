package com.ssafy.common.repository;

import com.ssafy.common.entity.Board;

public interface BoardRepositoryCustom {

    void updateLikeCount(Board board);
}
