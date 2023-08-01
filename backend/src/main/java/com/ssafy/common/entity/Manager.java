package com.ssafy.common.entity;

import com.ssafy.common.common.ManagerType;
import com.ssafy.common.dto.request.ManagerRequestDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter //Entity에 @Setter 사용 지양. (@Data 사용 지양)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Entity
@Table(name = "manager")
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //추가
    @Column(name = "manager_seq")
    private Short managerSeq;

    private String id;
    private String password;

    @Column(name = "login_date")
    private LocalDateTime loginDate;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Enumerated(EnumType.STRING)
    private ManagerType role; //역할 = {'SUPER', 'ADMIN'}

}
