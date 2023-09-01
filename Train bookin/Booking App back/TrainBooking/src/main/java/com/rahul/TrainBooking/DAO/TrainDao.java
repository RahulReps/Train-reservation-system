package com.rahul.TrainBooking.DAO;

import com.rahul.TrainBooking.model.Trains;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainDao extends JpaRepository<Trains, Integer> {

    List<Trains> findByDateContaining(String date);
    List<Trains> findByDateAndArrivalAndDestination(String date, String arrival, String destination);
}
