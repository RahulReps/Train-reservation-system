package com.rahul.TrainBooking.service;

import com.rahul.TrainBooking.DAO.TrainDao;
import com.rahul.TrainBooking.DAO.UserDao;
import com.rahul.TrainBooking.model.Trains;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TrainServiceImp implements TrainService {
    @Autowired
    private TrainDao trainDao;
    @Autowired
    private UserDao userDao;

    @Override
    public List<Trains> getTrains() {
        return trainDao.findAll();
    }

    @Override
    public Trains addTrain(Trains trains) {
        trainDao.save(trains);
        return trains;
    }

    @Override
    public String delete(Integer id){
        trainDao.deleteById(id);
        return "Deleted successfully!";
    }

    @Override
    public List<Trains> getByDateAndTravel(String date, String arrival, String destination) {
        return trainDao.findByDateAndArrivalAndDestination(date, arrival,destination);
    }
}
