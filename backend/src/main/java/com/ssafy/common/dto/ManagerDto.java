package com.ssafy.common.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class ManagerDto {

    private String id;
    private String password;

}