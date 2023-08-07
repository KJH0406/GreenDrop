package com.ssafy.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name="game")
public class Game implements Comparable<Game> , Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_seq")
    private Long gameSeq;

    //FK
    @JsonIgnore
    @ManyToOne(targetEntity = Board.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "board_seq", referencedColumnName = "board_seq")
    private Board board;

    @Column(name = "question")
    private String question;

    @Column(name = "left_answer")
    private String leftAnswer;

    @Column(name = "right_answer")
    private String rightAnswer;

    private LocalDate date;

    @CreatedDate
    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "left_amount")
    private Integer leftCount;

    @Column(name = "right_amount")
    private Integer rightCount;

    private String nickname;


    @Override
    public int compareTo(Game o) {
        return this.date.compareTo(o.date);
    }

}
