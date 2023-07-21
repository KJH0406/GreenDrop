package com.ssafy.common.dto.response;

import com.ssafy.common.common.ManagerType;
import com.ssafy.common.entity.Manager;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public record ManagerResponseDto( //프론트로 id, role 정보 응답
                                  String id,
                                  @Enumerated(EnumType.STRING)
                                  ManagerType role
                                  //TODO: token 추가
) {
    public static ManagerResponseDto from(Manager manager){
        return new ManagerResponseDto(
                manager.getId(),
                manager.getRole()
                //TODO: 토큰도 함께 반환
        );
    }
}
