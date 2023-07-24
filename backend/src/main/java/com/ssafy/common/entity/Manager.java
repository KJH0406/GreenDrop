package com.ssafy.common.entity;

import com.ssafy.common.common.ManagerType;
import com.ssafy.common.dto.request.ManagerRequestDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
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
    
    //registManager 에서 사용
    public static Manager registFrom(ManagerRequestDto request) { //Service에서 폼에서 입력받은 정보로 Manager 객체 생성 후 관리자 등록 save시 사용 예정
        return Manager.builder()
                .id(request.id())
                //TODO: 패스워드 암호화 적용
                .password(request.password())
                .createdDate(LocalDateTime.now())
                .role(ManagerType.ADMIN) 
                .build();
    }




}
