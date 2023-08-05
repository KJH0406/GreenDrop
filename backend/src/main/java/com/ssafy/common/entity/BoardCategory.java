package com.ssafy.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "board_category")
public class BoardCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_category_seq")
    private Long boardCategorySeq;
    @CreatedDate
    @Column(name = "create_date")
    private LocalDateTime createdDate;

    @JsonBackReference(value = "board-category")
    @ManyToOne(targetEntity = Board.class ,fetch = FetchType.LAZY)
    @JoinColumn(name = "board_seq" , referencedColumnName = "board_seq")
    private Board board;

    @JsonBackReference(value = "category")
    @ManyToOne(targetEntity = Category.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "category_seq" , referencedColumnName = "category_seq")
    private Category category;

}
