package com.ssafy.common.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "board")
public class Board implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_seq")
    private Long boardSeq;

    private String question;
    @Column(name = "left_answer")
    private String leftAnswer;
    @Column(name = "right_answer")
    private String rightAnswer;
    private String ip;
    private String nickname;
    private String password;
    @Column(name = "like_count")
    private Integer likeCount;
    @Column(name = "is_deleted")
    private Integer isDeleted;
    @Column(name = "deleted_date")
    private LocalDateTime deletedDate;
    @JsonManagedReference
    @OneToMany(mappedBy = "board" , cascade = CascadeType.ALL)
    private List<BoardCategory> boardCategories = new ArrayList<>();

}
