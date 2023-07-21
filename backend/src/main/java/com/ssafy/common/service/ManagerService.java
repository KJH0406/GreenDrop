package com.ssafy.common.service;

import com.ssafy.common.dto.request.ManagerRequestDto;
import com.ssafy.common.dto.response.ManagerResponseDto;
import com.ssafy.common.entity.Manager;
import com.ssafy.common.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ManagerService {
    private final ManagerRepository managerRepository;
    //TODO: jwt 토큰, 패스워드 암호화 추후 추가
    @Transactional
    public ManagerResponseDto registManager(ManagerRequestDto request){
        //TODO: 패스워드 암호화 적용
        Manager manager = managerRepository.save(Manager.registFrom(request));

        managerRepository.flush();

        return ManagerResponseDto.from(manager);

    }

    //TODO: 로그인 시각 DB에 저장하기
    @Transactional(readOnly = true)
    public ManagerResponseDto signIn(ManagerRequestDto request){
        Manager manager = managerRepository.findById(request.id())
                //TODO: 암호화 적용 후 암호화된 비밀번호와 비교하도록 수정
                .filter(it -> it.getPassword().equals(request.password()))
                .orElseThrow(()-> new IllegalArgumentException("아이디 또는 비밀번호가 일치하지 않습니다."));
        //TODO: 토큰 생성
        //TODO: 반환 시 생성자에 토큰 추가
        return new ManagerResponseDto(manager.getId(), manager.getRole());

    }




}
