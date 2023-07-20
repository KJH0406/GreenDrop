package com.ssafy.common.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_seq")
    private Long categorySeq;
    private String item;
    @JsonManagedReference
    @OneToMany(mappedBy = "category" , cascade = CascadeType.ALL)
    private List<BoardCategory> boardCategories = new ArrayList<>();
}
