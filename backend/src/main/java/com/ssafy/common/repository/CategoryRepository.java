package com.ssafy.common.repository;

import com.ssafy.common.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByItem(String item);
}
