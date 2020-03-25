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
            movieGroup.setGroupID(movieGroup.getGroupID().toUpperCase());
            return movieGroupRespository.save(movieGroup);
        } catch (Exception e) {
            throw new GroupIDException("Group ID '" + movieGroup.getGroupID().toUpperCase() + "' already exists");
        }
    }

    public MovieGroup findByGroupID(String id) {
        MovieGroup movieGroup = movieGroupRespository.findByGroupID(id.toUpperCase());

        if(movieGroup == null) {
            throw new GroupIDException("Group ID '" + movieGroup.getGroupID().toUpperCase() + "' already exists");
        }

        return movieGroup;
    }

    public void deleteGroupByGroupId(String id) {
        MovieGroup movieGroup = findByGroupID(id);
        movieGroupRespository.delete(movieGroup);
    }

    public Iterable<MovieGroup> findAllGroups() {
        return movieGroupRespository.findAll();
    }

}
