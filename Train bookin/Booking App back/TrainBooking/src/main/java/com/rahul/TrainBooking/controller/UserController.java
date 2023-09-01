package com.rahul.TrainBooking.controller;

import com.rahul.TrainBooking.model.Trains;
import com.rahul.TrainBooking.model.User;
import com.rahul.TrainBooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public List<User> getUsers(){
        return this.userService.getUser();
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable String id){
        return this.userService.getUserByID(id);
    }

    @PostMapping(path="/user",consumes = "application/json")
    public ResponseEntity<String> addUser(@RequestBody User user){
        return this.userService.addUser(user);
    }

    @PutMapping(path="/user/{username}",consumes = "application/json")
    public ResponseEntity<String> updateUser(@PathVariable String username, @RequestBody User user) {return this.userService.updateUser(username, user);}

    @PutMapping(path="/update-password/{username}/{existing}/{newPass}")
    public ResponseEntity<String> updatePassword(@PathVariable String username, @PathVariable String existing, @PathVariable String newPass){
        return this.userService.updatePassword(username,existing,newPass);
    }
}
