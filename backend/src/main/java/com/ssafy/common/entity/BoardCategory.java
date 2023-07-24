package com.ssafy.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

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

    @JsonBackReference
    @ManyToOne(targetEntity = Board.class ,fetch = FetchType.LAZY)
    @JoinColumn(name = "board_seq" , referencedColumnName = "board_seq")
    private Board board;

    @JsonBackReference
    @ManyToOne(targetEntity = Category.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "category_seq" , referencedColumnName = "category_seq")
    private Category category;

}
