package com.rahul.TrainBooking.controller;

import com.rahul.TrainBooking.DTO.PassengersDTO;
import com.rahul.TrainBooking.model.Passengers;
import com.rahul.TrainBooking.service.PassengerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PassengerController {
    @Autowired
    private PassengerService passengerService;

    @GetMapping("/passengers/{bookingId}")
    public ResponseEntity<?> getPassengers(@PathVariable String bookingId) {
        try {
            List<Passengers> passengers = this.passengerService.getPassengers(Integer.parseInt(bookingId));
            return ResponseEntity.ok(passengers);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("Invalid booking ID format.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving passengers: " + e.getMessage());
        }


    }

}
