package com.xiandabai.moviewebsite.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
public class Event {

    @Id
    @GeneratedValue
    private Long id;




}
