package com.rahul.TrainBooking.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.awt.print.Book;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pass_ent")
public class Passengers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pass_id;
    private String name;
    private Integer age;
    private String contact;
    private String gender;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "booking_list_id")
    private Booking booking;
}
