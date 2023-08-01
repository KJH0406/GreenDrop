package com.ssafy.common.dto.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class EquipmentRequestDto {
    private Long equipmentSeq;
    
}
