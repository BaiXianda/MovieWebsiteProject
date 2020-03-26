package com.xiandabai.moviewebsite.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
public class MovieList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name can not be empty")
    @Column(unique = true)
    private String name;
    private String description;
    private String movieGroupID;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "movieList")
    private List<Movie> movies = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movieGroup_id", nullable = false)
    @JsonIgnore
    private MovieGroup movieGroup;

    public MovieList() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    public MovieGroup getMovieGroup() {
        return movieGroup;
    }

    public void setMovieGroup(MovieGroup movieGroup) {
        this.movieGroup = movieGroup;
    }

    public String getMovieGroupID() {
        return movieGroupID;
    }

    public void setMovieGroupID(String movieGroupID) {
        this.movieGroupID = movieGroupID;
    }
}
