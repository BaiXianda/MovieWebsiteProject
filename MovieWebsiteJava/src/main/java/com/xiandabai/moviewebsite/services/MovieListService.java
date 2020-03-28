package com.xiandabai.moviewebsite.services;

import com.xiandabai.moviewebsite.domain.Movie;
import com.xiandabai.moviewebsite.domain.MovieGroup;
import com.xiandabai.moviewebsite.domain.MovieList;
import com.xiandabai.moviewebsite.repositories.MovieGroupRespository;
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

    @Autowired
    MovieGroupRespository movieGroupRespository;

    public MovieList saveOrUpdateMovieList(String movieGroup_id, MovieList movieList) {

        MovieGroup movieGroup = movieGroupRespository.findByGroupID(movieGroup_id);
        movieList.setMovieGroup(movieGroup);
        movieList.setMovieGroupID(movieGroup_id);

        return movieListRepository.save(movieList);
    }

    public MovieList findById(Long id) {
        return movieListRepository.getById(id);
    }

    public void deleteMovieById(Long id) {
        MovieList list = findById(id);
        movieListRepository.delete(list);
    }

    public Iterable<MovieList> findAllMovieLists() {
        return movieListRepository.findAll();
    }

    public Iterable<MovieList> findMovieListsByMovieGroupId(String movieGroupID) {
        return movieListRepository.findByMovieGroupID(movieGroupID);
    }

}
