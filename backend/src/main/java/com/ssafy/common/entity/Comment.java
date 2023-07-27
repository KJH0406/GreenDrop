package com.ssafy.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.io.Serializable;
import java.time.LocalDateTime;

@DynamicUpdate
@DynamicInsert
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "comment")
public class Comment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_seq")
    private Long commentSeq;
    @Column(name = "is_child")
    private Integer isChild;
    private String content;
    private String ip;
    @Column(name = "nickname")
    private String nickName;
    private String password;
    @Column(name = "parent_id")
    private Long parentId;
    @Column(name = "is_deleted")
    private Integer isDeleted;
    @Column(name = "deleted_datetime")
    private LocalDateTime deletedDateTime;
    @JsonBackReference(value = "comment-board")
    @ManyToOne(targetEntity = Board.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "board_seq" , referencedColumnName = "board_seq")
    private Board board;
}
