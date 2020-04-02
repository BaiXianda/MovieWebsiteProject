package com.xiandabai.moviewebsite.services;

import com.xiandabai.moviewebsite.domain.MovieGroup;
import com.xiandabai.moviewebsite.domain.User;
import com.xiandabai.moviewebsite.exceptions.GroupIDException;
import com.xiandabai.moviewebsite.repositories.MovieGroupRespository;
import com.xiandabai.moviewebsite.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.security.acl.Group;

@Service
public class MovieGroupService {

    @Autowired
    private ValidationErrorService validationErrorService;

    @Autowired
    private MovieGroupRespository movieGroupRespository;

    @Autowired
    private UserRepository userRepository;

    public MovieGroup saveOrUpdateGroup(MovieGroup movieGroup, String username) {

        if(movieGroup.getId() != null) {
            MovieGroup existMovieGroup= movieGroupRespository.findByGroupID(movieGroup.getGroupID());

            if(existMovieGroup != null && !existMovieGroup.getModerator().equals(username)) {
                throw new GroupIDException("Group not found in your account");
            } else if(existMovieGroup == null) {
                throw new GroupIDException("Group not found in your account");
            }
        }

        try {
            User user = userRepository.findByUsername(username);

            movieGroup.setGroupID(movieGroup.getGroupID().toUpperCase());
            movieGroup.setModerator(username);
            //movieGroup.getUsers().add(user);

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
