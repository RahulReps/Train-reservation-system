package com.rahul.TrainBooking.controller;

import com.rahul.TrainBooking.DAO.TrainDao;
import com.rahul.TrainBooking.model.Trains;
import com.rahul.TrainBooking.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TrainController {
    @Autowired
    private TrainService trainService;
    @GetMapping("/trains")
    public List<Trains> getTrains(){
        return this.trainService.getTrains();
    }

    @PostMapping(path="/trains",consumes = "application/json")
    public Trains addTrain(@RequestBody Trains trains){
        return this.trainService.addTrain(trains);
    }

    @GetMapping("/trains/{date}/{arrival}/{destination}")
    public List<Trains> getByDate(@PathVariable String date, @PathVariable String arrival, @PathVariable String destination){
        return this.trainService.getByDateAndTravel(date , arrival, destination);
    }

    @DeleteMapping("/deltrain/{id}")
    public String deleteTrain(@PathVariable String id){
        return this.trainService.delete(Integer.parseInt(id));
    }

}
