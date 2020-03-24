package com.xiandabai.moviewebsite.services;

import com.xiandabai.moviewebsite.domain.Movie;
import com.xiandabai.moviewebsite.domain.MovieList;
import com.xiandabai.moviewebsite.repositories.MovieListRepository;
import com.xiandabai.moviewebsite.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    MovieListRepository movieListRepository;

    public Movie saveOrUpdateMovie(String name, Movie movie) {
        MovieList movieList = movieListRepository.findByName(name);
        movie.setMovieList(movieList);
        movie.setMovieList_name(name);

        return movieRepository.save(movie);

    }

    public Movie findById(Long id) {
        return movieRepository.getById(id);
    }

    public void deleteMovieById(Long id) {
        Movie movie = findById(id);
        movieRepository.delete(movie);
    }

    public Iterable<Movie> findAllMovies() {
        return movieRepository.findAll();
    }

}
