package com.bloodbank.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "blood_units")
public class BloodUnit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bloodType; // A+, O-, etc.
    private LocalDate collectionDate;
    private LocalDate expiryDate;
    
    private String status; // AVAILABLE, USED, EXPIRED
}
