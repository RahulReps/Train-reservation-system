package com.rahul.TrainBooking.DTO;

import com.rahul.TrainBooking.model.Trains;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TrainBookingDTO {
    private Trains train;
    private Integer numberOfTickets;
    private String tier;
    private Integer pnr;
}