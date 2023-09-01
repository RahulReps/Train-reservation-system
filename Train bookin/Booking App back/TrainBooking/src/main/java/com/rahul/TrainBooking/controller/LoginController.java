package com.rahul.TrainBooking.controller;

import com.rahul.TrainBooking.DTO.LoginCred;
import com.rahul.TrainBooking.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginCred loginCred){
        return this.loginService.login(loginCred);
    }

}
