package com.ssafy.common.controller;

import com.ssafy.common.dto.request.EquipmentRequestDto;
import com.ssafy.common.dto.response.PlasticLogResponseDto;
import com.ssafy.common.service.GameService;
import com.ssafy.common.service.PlasticLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/plastic")
@RestController
public class PlasticLogController {
    private final GameService gameService;
    private final PlasticLogService plasticLogService;

    @PatchMapping("/{direction}")
    public ResponseEntity<PlasticLogResponseDto> updateVoteCount(
            @PathVariable String direction,
            @RequestBody EquipmentRequestDto equipmentRequestDto){
        PlasticLogResponseDto plasticLogResponseDto;
        try {
            plasticLogResponseDto = plasticLogService.updatePlastic(direction, equipmentRequestDto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(plasticLogResponseDto, HttpStatus.OK);
    }

    //지금까지 수거한 컵 총량
    @GetMapping("/list")
    public ResponseEntity<Object> totalPlastic(){
        Long totalPlastic = plasticLogService.getTotalPlastic();
        Map<String, Long> result = new HashMap<>();
        result.put("totalCount", totalPlastic);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //일자별 수거량
    @GetMapping("/list/{date}")
    public ResponseEntity<Object> plasticPerDay(@PathVariable LocalDate date){
        Integer plasticCount = plasticLogService.getPlasticCountByDate(date);
        Map<String, Integer> result = new HashMap<>();
        result.put("todayCount", plasticCount);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/current")
    public ResponseEntity<Object> currentPlastic(){
        PlasticLogResponseDto plasticLogResponseDto;
        try {
            plasticLogResponseDto = plasticLogService.getCurrentPlastic();
        } catch (Exception e) { //오늘 진행중인 밸런스게임이 없을 시 예외 발생
            throw new RuntimeException(e);
        }

        return new ResponseEntity<>(plasticLogResponseDto, HttpStatus.OK);
    }

    //시간대 별 수거량
    @GetMapping("/list/data/{date}")
    public ResponseEntity<Object> plasticByHour(@PathVariable LocalDate date){
        //8시부터 19시까지 시간별 집계
        List<Integer> result = plasticLogService.getPlasticCountByTime(date, 8, 19);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    //1주일 간 일자별 수거량
    @GetMapping("/list/week")
    public ResponseEntity<Object> plasticPerWeek(){
        //1주일간 집계량 일 단위로 반환
        List<Map> result = plasticLogService.getPlasticCountPerWeek(LocalDate.now());

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
