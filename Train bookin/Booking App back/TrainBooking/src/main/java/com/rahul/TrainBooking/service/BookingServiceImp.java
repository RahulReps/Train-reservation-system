package com.rahul.TrainBooking.service;

import com.rahul.TrainBooking.DAO.BookingDao;
import com.rahul.TrainBooking.DAO.PassengerDao;
import com.rahul.TrainBooking.DAO.TrainDao;
import com.rahul.TrainBooking.DAO.UserDao;
import com.rahul.TrainBooking.DTO.PassengersDTO;
import com.rahul.TrainBooking.DTO.TrainBookingDTO;
import com.rahul.TrainBooking.model.Booking;
import com.rahul.TrainBooking.model.Passengers;
import com.rahul.TrainBooking.model.Trains;
import com.rahul.TrainBooking.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingServiceImp implements BookingService {
    @Autowired
    private BookingDao bookingDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private TrainDao trainDao;

    @Autowired
    private PassengerDao passengerDao;

    public ResponseEntity<String> createBooking(String username, Integer trainId, String classes, Integer numberOfTickets, List<PassengersDTO> passengers) {
        User user = userDao.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("User not found.");
        }

        Trains train = trainDao.findById(trainId).orElse(null);
        if (train == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Train not found.");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setTrain(train);
        booking.setNumberOfTickets(numberOfTickets);
        booking.setTier(classes);

        if (classes.equals("first_class") && numberOfTickets < train.getFc()) {
            train.setFc(train.getFc() - numberOfTickets);
        }

        if (classes.equals("second_class") && numberOfTickets < train.getSc()) {
            train.setSc(train.getSc() - numberOfTickets);
        }

        if (classes.equals("third_class") && numberOfTickets < train.getTc()) {
            train.setTc(train.getTc() - numberOfTickets);
        }

        if (classes.equals("chair_car") && numberOfTickets < train.getCc()) {
            train.setCc(train.getCc() - numberOfTickets);
        }

        trainDao.save(train);

        try {
            bookingDao.save(booking);
            user.getBookings().add(booking);
            train.getBookings().add(booking);

            for (PassengersDTO passengersDTO : passengers) {
                Passengers passenger = new Passengers();
                passenger.setName(passengersDTO.getName());
                passenger.setAge(passengersDTO.getAge());
                passenger.setContact(passengersDTO.getContact());
                passenger.setGender(passengersDTO.getGender());
                booking.addPassenger(passenger);
            }

            bookingDao.save(booking);

            return ResponseEntity.ok("Booking created successfully.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating booking: " + e.getMessage());
        }
    }


    public ResponseEntity<List<TrainBookingDTO>> getUserTrainBookings(String username) {
        User user = userDao.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        List<TrainBookingDTO> trainBookings = new ArrayList<>();
        for (Booking booking : user.getBookings()) {
            TrainBookingDTO dto = new TrainBookingDTO();
            dto.setTrain(booking.getTrain());
            dto.setNumberOfTickets(booking.getNumberOfTickets());
            dto.setTier(booking.getTier());
            dto.setPnr(booking.getId());
            trainBookings.add(dto);
        }

        return ResponseEntity.ok(trainBookings);
    }

    public ResponseEntity<String> cancelBooking(Integer bookingId) {
        Booking booking = bookingDao.findById(bookingId).orElse(null);
        if (booking == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Booking not found.");
        }

        Trains train = booking.getTrain();
        if (train != null) {
            String classes = booking.getTier();
            if (classes.equals("first_class")) {
                train.setFc(train.getFc() + booking.getNumberOfTickets());
            } else if (classes.equals("second_class")) {
                train.setSc(train.getSc() + booking.getNumberOfTickets());
            } else if (classes.equals("third_class")) {
                train.setTc(train.getTc() + booking.getNumberOfTickets());
            } else if (classes.equals("chair_car")) {
                train.setCc(train.getCc() + booking.getNumberOfTickets());
            }
            trainDao.save(train);
        }

        try {
            booking.cancelBooking();
            bookingDao.delete(booking);

            return ResponseEntity.ok("Booking canceled successfully.");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error canceling booking: " + e.getMessage());
        }
    }
}

