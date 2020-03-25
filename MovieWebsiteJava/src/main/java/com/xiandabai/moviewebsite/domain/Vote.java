package com.xiandabai.moviewebsite.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.HashMap;

@Entity
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "must set a start time")
    private Date startTime;

    @NotBlank(message = "must set a end time")
    private Date endTime;

    private MovieList movieList;

    private HashMap<Long, Movie> voteMap;

    public Vote(){

    }
}
