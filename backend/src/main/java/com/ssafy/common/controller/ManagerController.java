package com.ssafy.common.controller;

import com.ssafy.common.dto.ManagerListDto;
import com.ssafy.common.dto.request.ManagerRequestDto;
import com.ssafy.common.dto.response.ManagerResponseDto;
import com.ssafy.common.security.SuperAuthorize;
import com.ssafy.common.service.ManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/manager")
public class ManagerController {
    private final ManagerService managerService;

    //관리자 등록 기능
    @SuperAuthorize
    @PostMapping("/regist")
    public ResponseEntity<?> registManager(@RequestBody ManagerRequestDto managerRequestDto){
        managerService.registManager(managerRequestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> signIn(@RequestBody ManagerRequestDto managerRequestDto){
        ManagerResponseDto response;
        try {
            response = managerService.signIn(managerRequestDto);
        } catch(IllegalArgumentException e){ //id나 비번이 일치하지 않는 경우
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @SuperAuthorize
    @GetMapping("/api/list")
    public ResponseEntity<Object> getManagerList(){
        List<ManagerListDto> managerList = managerService.getAllManager();

        return new ResponseEntity<>(managerList, HttpStatus.OK);
    }

    @SuperAuthorize
    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteManager(@RequestBody Map<String, Short> managerInfo){
        Short managerSeq = managerInfo.get("managerSeq");
        managerService.deleteManager(managerSeq);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/change/password")
    public ResponseEntity<Object> changeAdminPassword(@RequestBody Map<String, String> adminInfo){
        managerService.changeAdminPassword(adminInfo);

        return new ResponseEntity<>(HttpStatus.OK);

    }

}
