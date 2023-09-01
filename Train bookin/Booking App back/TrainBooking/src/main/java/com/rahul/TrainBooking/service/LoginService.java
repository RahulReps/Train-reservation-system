package com.rahul.TrainBooking.service;

import com.rahul.TrainBooking.DTO.LoginCred;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

public interface LoginService {
    public ResponseEntity<String> login(LoginCred loginCred);
}
