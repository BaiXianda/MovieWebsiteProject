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

    public Vote(@NotBlank(message = "must set a start time") Date startTime, @NotBlank(message = "must set a end time") Date endTime, MovieList movieList, HashMap<Long, Movie> voteMap) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.movieList = movieList;
        this.voteMap = voteMap;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public MovieList getMovieList() {
        return movieList;
    }

    public void setMovieList(MovieList movieList) {
        this.movieList = movieList;
    }

    public HashMap<Long, Movie> getVoteMap() {
        return voteMap;
    }

    public void setVoteMap(HashMap<Long, Movie> voteMap) {
        this.voteMap = voteMap;
    }
}
