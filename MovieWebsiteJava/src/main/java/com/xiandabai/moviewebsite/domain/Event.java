package com.xiandabai.moviewebsite.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Event {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank(message = "must have a vote")
    private Vote vote;

    @NotBlank(message = "must set eventTime")
    private Date eventTime;

    @NotBlank(message = "must choose a movieList")
    private MovieList movieList;

    @NotBlank(message = "must set a title")
    private String title;

    public Event(@NotBlank(message = "must have a vote") Vote vote, @NotBlank(message = "must set eventTime") Date eventTime, @NotBlank(message = "must choose a movieList") MovieList movieList, @NotBlank(message = "must set a title") String title) {
        this.vote = vote;
        this.eventTime = eventTime;
        this.movieList = movieList;
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Vote getVote() {
        return vote;
    }

    public void setVote(Vote vote) {
        this.vote = vote;
    }

    public Date getEventTime() {
        return eventTime;
    }

    public void setEventTime(Date eventTime) {
        this.eventTime = eventTime;
    }

    public MovieList getMovieList() {
        return movieList;
    }

    public void setMovieList(MovieList movieList) {
        this.movieList = movieList;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
