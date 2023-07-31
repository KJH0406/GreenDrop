package com.ssafy.common.repository;

import com.ssafy.common.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Optional<Category> findByItem(String item);

    Optional<Category> findByCategorySeq(Long categorySeq);

}
