package com.bloodbank.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity @Data @Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String role; // ROLE_ADMIN, ROLE_WORKER, ROLE_USER
    private boolean isGovtOfficer; // For the discount
    
    @Column(unique = true)
    private String email;
    
    @Column(name = "government_id")
    private String governmentId; // Encrypted

    private java.time.LocalDate lastDonationDate;
}