package com.ssafy.common.controller;

import com.ssafy.common.dto.request.ReservationRequestDto;
import com.ssafy.common.entity.Reservation;
import com.ssafy.common.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/reservation")
@RestController
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping("/regist")
    public ResponseEntity<Object> registReservation(
            @RequestBody ReservationRequestDto reservationRequestDto
    ) {
        reservationService.registReservation(reservationRequestDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Reservation>> reservationList() {
        List<Reservation> reservationList = reservationService.findReservationByDate();

        return new ResponseEntity<>(reservationList, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{reservationSeq}")
    public ResponseEntity<Object> cancelReservation(@PathVariable Long reservationSeq){
        reservationService.deleteReservation(reservationSeq);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
