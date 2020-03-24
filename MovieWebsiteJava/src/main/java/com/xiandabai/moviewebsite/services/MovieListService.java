package com.xiandabai.moviewebsite.services;

import com.xiandabai.moviewebsite.domain.Movie;
import com.xiandabai.moviewebsite.domain.MovieList;
import com.xiandabai.moviewebsite.repositories.MovieListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class MovieListService {

    @Autowired
    MovieListRepository movieListRepository;

    @Autowired
    ValidationErrorService validationErrorService;

    public MovieList saveOrUpdateMovieList(MovieList movieList) {
        return movieListRepository.save(movieList);
    }

    public MovieList findById(Long id) {
        return movieListRepository.getById(id);
    }

    public void deleteMovieById(Long id) {
        MovieList list = findById(id);
        movieListRepository.delete(list);
    }

    public Iterable<MovieList> findAllMovies() {
        return movieListRepository.findAll();
    }

}
