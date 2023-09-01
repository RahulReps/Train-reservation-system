package com.rahul.TrainBooking.service;

import com.rahul.TrainBooking.model.Trains;

import javax.swing.*;
import java.util.List;

public interface TrainService {
    public List<Trains> getTrains();
    public Trains addTrain(Trains trains);
    public String delete(Integer id);
    public List<Trains> getByDateAndTravel(String date, String arrival, String destination);
}
