package com.ssafy.common.dto.request;

//관리자 등록 & 관리자 로그인 요청 시 두가지만 사용함
public record ManagerRequestDto (
    String id,
    String password //암호화된 비밀번호
) {}
