package com.rahul.TrainBooking.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "train_ent")

public class Trains {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    String name;
    String arrival;
    String destination;
    String date;
    String time;
    Integer fc;
    Integer sc;
    Integer tc;
    Integer cc;


    @JsonIgnore
    @OneToMany(mappedBy = "train")
    private Set<Booking> bookings = new HashSet<>();
}
