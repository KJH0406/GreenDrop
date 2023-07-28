package com.ssafy.common.service;

import com.ssafy.common.dto.request.ManagerRequestDto;
import com.ssafy.common.dto.response.ManagerResponseDto;
import com.ssafy.common.entity.Manager;
import com.ssafy.common.repository.ManagerRepository;
import com.ssafy.common.security.Encoder;
import com.ssafy.common.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ManagerService {
    private final ManagerRepository managerRepository;
    private final TokenProvider tokenProvider;

    @Transactional
    public void registManager(ManagerRequestDto request){
        Encoder encoder = new Encoder();
//        Manager manager = managerRepository.save(request.toRegistEntity(encoder)); //패스워드 암호화를 위한 encoder 추가
        managerRepository.save(request.toRegistEntity(encoder)); //패스워드 암호화를 위한 encoder 추가
//        return ManagerResponseDto.from(manager);
    }

    //TODO: 로그인 시각 DB에 저장하기
    public ManagerResponseDto signIn(ManagerRequestDto request){
        Encoder encoder = new Encoder();
        Manager manager = managerRepository.findById(request.id())
                .filter(it -> encoder.matches(request.password(), it.getPassword())) //요청에 담긴 password와 암호화된 password 비교
                .orElseThrow(()-> new IllegalArgumentException("아이디 또는 비밀번호가 일치하지 않습니다."));
        //토큰 생성
        String token = tokenProvider.createToken(String.format("%s:%s", manager.getId(), manager.getRole()));
        return ManagerResponseDto.from(manager, token);
    }
}
