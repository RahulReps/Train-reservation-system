package com.rahul.TrainBooking.DAO;

import com.rahul.TrainBooking.model.Passengers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PassengerDao extends JpaRepository<Passengers,Integer> {
}
