package com.ssafy.common.service;

import com.ssafy.common.dto.request.EquipmentRequestDto;
import com.ssafy.common.dto.response.PlasticLogResponseDto;
import com.ssafy.common.entity.Equipment;
import com.ssafy.common.entity.Game;
import com.ssafy.common.entity.PlasticLog;
import com.ssafy.common.repository.EquipmentRepository;
import com.ssafy.common.repository.GameRepository;
import com.ssafy.common.repository.PlasticLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class PlasticLogService {
    private final PlasticLogRepository plasticLogRepository;
    private final GameRepository gameRepository;
    private final EquipmentRepository equipmentRepository;

    @Transactional
    public PlasticLogResponseDto updatePlastic(String direction, EquipmentRequestDto equipmentRequestDto) throws Exception {
        //1. 오늘 날짜의 game 가져옴
        List<Game> gameList = gameRepository.findByDateOrderByCreatedDateAsc(LocalDate.now());
        Game game;
        if(gameList.size() == 0){
            //오늘의 밸런스 게임이 없을 시 exception
            throw new Exception();
        }
        else{
            //해당 날짜에 가장 최근 등록된 게임 가져옴
            game = gameList.get(gameList.size() - 1);
        }
        Long equipmentSeq = equipmentRequestDto.getEquipmentSeq();
        Equipment equipment = equipmentRepository.findEquipmentByEquipmentSeq(equipmentSeq).get(0);
        //2. 가져온 game의 id로 plasticLog 생성
        PlasticLog plasticLog = PlasticLog.builder()
                .game(game)
                .leftRight(direction)
                .equipment(equipment)
                .createdDate(LocalDateTime.now())
                .build();
        //3. game_log 테이블에 로그 추가
        plasticLogRepository.save(plasticLog);
        gameRepository.updateCountByLR(direction);

        //TODO: 갱신된 결과값 바로 나오도록 만들기
        PlasticLogResponseDto response = PlasticLogResponseDto.fromEntity(game);
        if (direction.equals("L")) {
            response.setLeftCount(response.getLeftCount() + 1);
        } else if (direction.equals("R")) {
            response.setRightCount(response.getRightCount() + 1);
        }
        return response;
    }

    //현재 게임에서의 투표 현황
    public PlasticLogResponseDto getCurrentPlastic() throws Exception {
        List<Game> gameList = gameRepository.findByDateOrderByCreatedDateAsc(LocalDate.now());
        Game game;
        if(gameList.size() == 0){
            throw new Exception();
        }
        else{
            game = gameList.get(gameList.size()-1);
        }
        return PlasticLogResponseDto.fromEntity(game);
    }

    public Long getTotalPlastic() {
        return plasticLogRepository.count();
    }

    public Integer getPlasticCountByDate(LocalDate date){
        LocalDateTime startTime = date.atStartOfDay();
        LocalDateTime endTime = date.atTime(LocalTime.MAX);

        return plasticLogRepository.countByTime(startTime, endTime);
    }

    public List<Integer> getPlasticCountByTime(LocalDate date, int startHour, int endHour){
        //8~9시, 9~10시, ..., 18~19시 각 구간의 집계량 반환
        int year = date.getYear();
        int month = date.getMonthValue();
        int day = date.getDayOfMonth();
        List<Integer> result = new LinkedList<>();
        for(int hour = startHour; hour < endHour; hour++){
            LocalDateTime startTime = LocalDateTime.of(year, month, day, hour, 0, 0);
            LocalDateTime endTime = LocalDateTime.of(year, month, day, hour, 59, 59);
            int count = plasticLogRepository.countByTime(startTime, endTime);
            result.add(count);
        }
        return result;
    }

    //해당 일자로부터 1주일 전까지 집계 데이터 조회
    //{"x":"7/27", "y":25}, ...
    public List<Map> getPlasticCountPerWeek(LocalDate endDate){
        LocalDate startDate = endDate.minusDays(6);
        List<Map> result = new LinkedList<>();
        for(LocalDate curDate = startDate; curDate.compareTo(endDate) <= 0; curDate = curDate.plusDays(1)){
            int month = curDate.getMonthValue();
            int day = curDate.getDayOfMonth();
            String dateStr = Integer.toString(month)+"/"+Integer.toString(day);
            LocalDateTime startTime = curDate.atStartOfDay();
            LocalDateTime endTime = curDate.atTime(LocalTime.MAX);
            int curTotalPlastic = plasticLogRepository.countByTime(startTime, endTime);

            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("x", dateStr);
            resultMap.put("y", curTotalPlastic);
            result.add(resultMap);
        }
        return result;
    }
}
