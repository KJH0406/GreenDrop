package com.ssafy.common.repository;

import com.ssafy.common.entity.Manager;

public interface ManagerRepositoryCustom {
    Manager searchManagerFromId(String id);
}