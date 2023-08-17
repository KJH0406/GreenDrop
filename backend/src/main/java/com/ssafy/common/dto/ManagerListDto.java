package com.ssafy.common.dto;

import com.ssafy.common.common.ManagerType;
import com.ssafy.common.entity.Manager;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class ManagerListDto {
    private Short managerSeq;
    private String id;
    private LocalDateTime createdDate;
    private ManagerType role;

    public static ManagerListDto fromEntity(Manager manager){
        return ManagerListDto.builder()
                .managerSeq(manager.getManagerSeq())
                .id(manager.getId())
                .createdDate(manager.getCreatedDate())
                .role(manager.getRole())
                .build();
    }
}
