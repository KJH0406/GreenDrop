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

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class PlasticLogService {
    private final PlasticLogRepository plasticLogRepository;
    private final GameRepository gameRepository;
    private final EquipmentRepository equipmentRepository;

    @Transactional
    public PlasticLogResponseDto updatePlastic(String direction, EquipmentRequestDto equipmentRequestDto) {
        //1. 오늘 날짜의 game 가져옴
        Game game = gameRepository.findOneByDate(LocalDate.now());
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

    public PlasticLogResponseDto getCurrentPlastic() {
        Game game = gameRepository.findOneByDate(LocalDate.now());
        return PlasticLogResponseDto.fromEntity(game);
    }

    public Long getTotalPlastic() {
        return plasticLogRepository.count();
    }

    public Integer getPlasticCountByDate(LocalDate date) {
        Game game = gameRepository.findOneByDate(date);
        return game.getLeftCount() + game.getRightCount();
    }
}
