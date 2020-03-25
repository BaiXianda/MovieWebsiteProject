package com.xiandabai.moviewebsite.services;

import com.xiandabai.moviewebsite.domain.MovieGroup;
import com.xiandabai.moviewebsite.exceptions.GroupIDException;
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
        try {
            return movieGroupRespository.save(movieGroup);
        } catch (Exception e) {
            throw new GroupIDException("Group ID '" + movieGroup.getGroupID().toUpperCase() + "' already exists");
        }
    }

    public MovieGroup findById(Long id) {
        return movieGroupRespository.getById(id);
    }

    public MovieGroup findByGroupID(String id) {
        MovieGroup movieGroup = movieGroupRespository.getByGroupID(id);

        if(movieGroup == null) {
            throw new GroupIDException("Group ID '" + movieGroup.getGroupID().toUpperCase() + "' already exists");
        }

        return movieGroup;
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
