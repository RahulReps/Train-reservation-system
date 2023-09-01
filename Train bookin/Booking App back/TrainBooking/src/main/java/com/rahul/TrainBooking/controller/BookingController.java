package com.rahul.TrainBooking.controller;

import com.rahul.TrainBooking.DTO.PassengersDTO;
import com.rahul.TrainBooking.DTO.TrainBookingDTO;
import com.rahul.TrainBooking.model.Passengers;
import com.rahul.TrainBooking.service.BookingService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/user/{username}/bookings/{trainId}/class/{classes}/not/{numberOfTickets}")
    public ResponseEntity<String> createBooking(
            @PathVariable String username,
            @PathVariable String trainId,
            @PathVariable String classes,
            @PathVariable String numberOfTickets,
            @RequestBody List<PassengersDTO> passengers
    ){
        return this.bookingService.createBooking(username, Integer.parseInt(trainId), classes, Integer.parseInt(numberOfTickets), passengers);
    }


    @GetMapping("/getmytrain/{username}")
    public ResponseEntity<List<TrainBookingDTO>> displayTrains(@PathVariable String username) {
        return this.bookingService.getUserTrainBookings(username);
    }

    @DeleteMapping("/bookings/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable Integer bookingId) {
        return this.bookingService.cancelBooking(bookingId);
    }
}
