package com.ssafy.common.service;

import com.ssafy.common.dto.ManagerListDto;
import com.ssafy.common.dto.request.ManagerRequestDto;
import com.ssafy.common.dto.response.ManagerResponseDto;
import com.ssafy.common.entity.Manager;
import com.ssafy.common.repository.ManagerRepository;
import com.ssafy.common.security.Encoder;
import com.ssafy.common.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ManagerService {
    private final ManagerRepository managerRepository;
    private final TokenProvider tokenProvider;

    //일반 ADMIN 등록
    @Transactional
    public void registManager(ManagerRequestDto request){
        Encoder encoder = new Encoder();
        managerRepository.save(request.toRegistEntity(encoder)); //패스워드 암호화를 위한 encoder 추가
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

    public List<ManagerListDto> getAllManager(){
        List<Manager> managerList = managerRepository.findAll();
        List<ManagerListDto> result = new LinkedList<>();
        for(Manager manager: managerList){
            result.add(ManagerListDto.fromEntity(manager));
        }
        return result;
    }

    //삭제된 컬럼 수 반환
    @Transactional
    public void deleteManager(Short managerSeq){
        managerRepository.deleteByManagerSeq(managerSeq);
    }

    @Transactional
    public void changeAdminPassword(Map<String, String> adminInfo){
        String id = adminInfo.get("id");
        String password = adminInfo.get("password");
        String newPassword = adminInfo.get("newPassword");

        Encoder encoder = new Encoder();
        Manager manager = managerRepository.findById(id)
                .filter(it -> encoder.matches(password, it.getPassword())) //요청에 담긴 password와 암호화된 password 비교
                .orElseThrow(()-> new IllegalArgumentException("아이디 또는 비밀번호가 일치하지 않습니다."));
        if(newPassword.equals("") || newPassword == null) throw new IllegalArgumentException("새 비밀번호를 입력해 주세요.");
        Manager newManager = Manager.builder()
                .managerSeq(manager.getManagerSeq())
                .id(manager.getId())
                .password(encoder.encode(newPassword))
                .createdDate(manager.getCreatedDate())
                .role(manager.getRole())
                .build();
        managerRepository.save(newManager);
    }
}
