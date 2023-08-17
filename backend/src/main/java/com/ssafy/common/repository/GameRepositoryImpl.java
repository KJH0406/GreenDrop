package com.ssafy.common.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.common.entity.Game;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

import static com.ssafy.common.entity.QGame.game;

@Repository
public class GameRepositoryImpl extends QuerydslRepositorySupport implements GameRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    public GameRepositoryImpl(JPAQueryFactory jpaQueryFactory){
        super(Game.class);
        this.queryFactory = jpaQueryFactory;
    }

    @Override
    public void updateCountByLR(String leftRight){
        if(leftRight.equals("L")){
            queryFactory.update(game)
                    .set(game.leftCount, game.leftCount.add(1))
                    .where(game.date.eq(LocalDate.now()))
                    .execute();
        }
        else if(leftRight.equals("R")){
            queryFactory.update(game)
                    .set(game.rightCount, game.rightCount.add(1))
                    .where(game.date.eq(LocalDate.now()))
                    .execute();
        }
    }
}
