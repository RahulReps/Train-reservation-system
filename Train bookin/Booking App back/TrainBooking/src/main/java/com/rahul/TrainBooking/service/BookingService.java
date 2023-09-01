package com.rahul.TrainBooking.service;

import com.rahul.TrainBooking.DTO.PassengersDTO;
import com.rahul.TrainBooking.DTO.TrainBookingDTO;
import com.rahul.TrainBooking.model.Trains;
import com.rahul.TrainBooking.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BookingService {
    public ResponseEntity<String> createBooking(String user, Integer train, String classes, Integer numberOfTickets, List<PassengersDTO> passengers);
    public ResponseEntity<List<TrainBookingDTO>> getUserTrainBookings(String username);

    ResponseEntity<String> cancelBooking(Integer bookingId);
}
