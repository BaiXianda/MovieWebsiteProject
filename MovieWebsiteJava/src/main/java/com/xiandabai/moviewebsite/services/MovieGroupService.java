package com.xiandabai.moviewebsite.services;

import com.xiandabai.moviewebsite.domain.MovieGroup;
import com.xiandabai.moviewebsite.repositories.MovieGroupRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieGroupService {

    @Autowired
    ValidationErrorService validationErrorService;

    @Autowired
    MovieGroupRespository movieGroupRespository;

    public MovieGroup saveOrUpdateGroup(MovieGroup movieGroup) {
        return movieGroupRespository.save(movieGroup);
    }

    public MovieGroup findById(Long id) {
        return movieGroupRespository.getById(id);
    }

    public MovieGroup findByGroupID(String id) {
        return movieGroupRespository.getByGroupID(id);
    }

    public void deleteGroupByGroupId(String id) {
        MovieGroup movieGroup = findByGroupID(id);
        movieGroupRespository.delete(movieGroup);
    }

    public void deleteGroupById(Long id) {
        MovieGroup movieGroup = findById(id);
        movieGroupRespository.delete(movieGroup);
    }

    public Iterable<MovieGroup> findAllGroups() {
        return movieGroupRespository.findAll();
    }

}
