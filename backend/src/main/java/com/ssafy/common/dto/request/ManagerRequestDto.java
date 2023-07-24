package com.ssafy.common.dto.request;

import com.ssafy.common.common.ManagerType;
import com.ssafy.common.entity.Manager;
import com.ssafy.common.security.Encoder;

import java.time.LocalDateTime;

//관리자 등록 & 관리자 로그인 요청 시 두가지만 사용함
public record ManagerRequestDto (
    String id,
    String password //암호화된 비밀번호
) {
    public Manager toRegistEntity(Encoder encoder){ //관리자 등록 시 Entity 생성.
        return Manager.builder()
                .id(id)
                .password(encoder.encode(password)) //패스워드 암호화하여 저장
                .createdDate(LocalDateTime.now())
                .role(ManagerType.ADMIN)
                .build();
    }
}
