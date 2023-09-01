package com.rahul.TrainBooking.DAO;

import com.rahul.TrainBooking.model.Booking;
import com.rahul.TrainBooking.model.Trains;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingDao extends JpaRepository<Booking, Integer> {

}
