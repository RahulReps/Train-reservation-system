package com.rahul.TrainBooking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "booking_list")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name  = "user_ent_username")
    private User user;

    @ManyToOne
    @JoinColumn(name = "train_ent_id")
    private Trains train;
    private Integer numberOfTickets;
    private String tier;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Passengers> passengers = new HashSet<>();

    public void addPassenger(Passengers passenger) {
        passengers.add(passenger);
        passenger.setBooking(this);
    }

    public void removePassenger(Passengers passenger) {
        passengers.remove(passenger);
        passenger.setBooking(null);
    }


    public void cancelBooking() {
        this.user.getBookings().remove(this);
        this.train.getBookings().remove(this);
        this.user = null;
        this.train = null;
    }
}
