package com.rahul.TrainBooking.DAO;

import com.rahul.TrainBooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User,Integer> {
    User findByUsername(String username);
}
