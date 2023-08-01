package com.ssafy.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "game_log")
public class PlasticLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plastic_seq")
    private Long plasticSeq;

    //FK
    @JsonIgnore
    @ManyToOne(targetEntity = Game.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "game_seq", referencedColumnName = "game_seq")
    private Game game;

    //FK
    @JsonIgnore
    @ManyToOne(targetEntity = Equipment.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "equipment_seq", referencedColumnName = "equipment_seq")
    private Equipment equipment;

    @Column(name = "left_right")
    private String leftRight;

    @CreatedDate
    @Column(name = "created_date")
    private LocalDateTime createdDate;
}
