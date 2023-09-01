package com.rahul.TrainBooking.service;

import com.rahul.TrainBooking.model.Passengers;

import java.util.List;

public interface PassengerService {
    public List<Passengers> getPassengers(Integer bookingId);
}
