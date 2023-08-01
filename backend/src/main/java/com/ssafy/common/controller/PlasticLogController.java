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
        PlasticLogResponseDto response = plasticLogService.updatePlastic(direction, equipmentRequestDto);

        return new ResponseEntity<>(response, HttpStatus.OK);
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
        PlasticLogResponseDto plasticLogResponseDto = plasticLogService.getCurrentPlastic();

        return new ResponseEntity<>(plasticLogResponseDto, HttpStatus.OK);
    }
}
