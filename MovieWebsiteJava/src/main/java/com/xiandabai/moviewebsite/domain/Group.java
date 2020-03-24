package com.xiandabai.moviewebsite.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Must have a group name")
    @Size(max = 20, message = "Can not have more than 20 characters")
    @Column(updatable = false, unique = true)
    private String name;

    private String description;

    

}
