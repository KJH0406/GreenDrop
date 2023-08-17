package com.ssafy.common.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.common.entity.Manager;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import static com.ssafy.common.entity.QManager.manager;

public class ManagerRepositoryImpl extends QuerydslRepositorySupport implements ManagerRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public ManagerRepositoryImpl(JPAQueryFactory jpaQueryFactory){
        super(Manager.class);
        this.queryFactory = jpaQueryFactory;
    }

    @Override
    public Manager searchManagerFromId(String managerId) {
        return queryFactory
                .selectFrom(manager)
                .where(manager.id.eq(managerId))
                .fetchOne();
    }
}