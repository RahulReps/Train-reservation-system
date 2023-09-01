package com.rahul.TrainBooking.service;

import com.rahul.TrainBooking.DAO.UserDao;
import com.rahul.TrainBooking.DTO.LoginCred;
import com.rahul.TrainBooking.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service

public class LoginServiceImp implements LoginService{

    @Autowired
    private UserDao userDao;
    public ResponseEntity<String> login(LoginCred loginCred){
        User user = userDao.findByUsername(loginCred.getUsername());
        if (user != null && user.getPassword().equals(loginCred.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
        }
    }
}
