package com.rahul.TrainBooking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.swing.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_ent")
public class User {
    private String name;
    private Integer age;

    @Id
    private String username;
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Booking> bookings = new HashSet<>();

}
