package com.rahul.TrainBooking.service;

import com.rahul.TrainBooking.DAO.BookingDao;
import com.rahul.TrainBooking.DAO.PassengerDao;
import com.rahul.TrainBooking.model.Booking;
import com.rahul.TrainBooking.model.Passengers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PassengerServiceImp implements PassengerService {

    @Autowired
    private PassengerDao passengerDao;
    @Autowired
    private BookingDao bookingDao;

    @Override
    public List<Passengers> getPassengers(Integer bookingId) {
        Booking booking = bookingDao.findById(bookingId).get();
        return new ArrayList<>( booking.getPassengers());
    }
}
