package com.rahul.TrainBooking.service;

import com.rahul.TrainBooking.model.Trains;
import com.rahul.TrainBooking.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;

public interface UserService {
    public List<User> getUser();
    public User getUserByID(String id);
    public ResponseEntity<String> addUser(User user) ;
    public ResponseEntity<String> updateUser(String username, User user);
    public ResponseEntity<String> updatePassword(String user, String existing, String newPass);
}
