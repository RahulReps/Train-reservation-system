package com.rahul.TrainBooking.service;

import com.rahul.TrainBooking.DAO.TrainDao;
import com.rahul.TrainBooking.DAO.UserDao;
import com.rahul.TrainBooking.model.Trains;
import com.rahul.TrainBooking.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImp implements UserService{
    @Autowired
    private UserDao userDao;

    @Autowired
    private TrainDao trainDao;

    @Override
    public List<User> getUser() {
        return userDao.findAll();
    }

    @Override
    public User getUserByID(String id) {
        return userDao.findByUsername(id);
    }

    @Override
    public ResponseEntity<String> addUser(User user) {
        if(userDao.findByUsername(user.getUsername())==null) {
            userDao.save(user);
            return ResponseEntity.ok("Register successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username Taken");
    }

    @Override
    public ResponseEntity<String> updateUser(String username, User user) {
        User orginal=userDao.findByUsername(username);
        if(user.getUsername().length()<8){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("invalid username");
        }
        orginal.setName(user.getName());
        orginal.setAge(user.getAge());

        userDao.save(orginal);
        return ResponseEntity.ok("Updated Successfully!!");
    }

    @Override
    public ResponseEntity<String> updatePassword(String user, String existing, String newPass) {
        User curUser= userDao.findByUsername(user);
        if(curUser.getPassword().equals(existing)){
            curUser.setPassword(newPass);
            userDao.save(curUser);
            return ResponseEntity.ok("Updated Successfully!!");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password");
    }
}
