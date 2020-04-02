package com.xiandabai.moviewebsite.controllers;

import com.xiandabai.moviewebsite.domain.MovieGroup;
import com.xiandabai.moviewebsite.services.MovieGroupService;
import com.xiandabai.moviewebsite.services.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/group")
@CrossOrigin
public class MovieGroupController {

    @Autowired
    private MovieGroupService movieGroupService;

    @Autowired
    private ValidationErrorService validationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewGroup(@Valid @RequestBody MovieGroup movieGroup, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = validationErrorService.MapValidationService(result);
        if(errorMap != null)
            return errorMap;

        MovieGroup newMovieGroup = movieGroupService.saveOrUpdateGroup(movieGroup, principal.getName());
        return new ResponseEntity<MovieGroup>(newMovieGroup, HttpStatus.CREATED);
    }

    @GetMapping("/{groupID}")
    public ResponseEntity<?> getGroupByGroupID(@PathVariable String groupID) {
        MovieGroup movieGroup = movieGroupService.findByGroupID(groupID);

        return new ResponseEntity<MovieGroup>(movieGroup, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<MovieGroup> getAllGroups() {
        return movieGroupService.findAllGroups();
    }

    @DeleteMapping("/{groupID}")
    public ResponseEntity<?> deleteGroup(@PathVariable String groupID) {
        movieGroupService.deleteGroupByGroupId(groupID);
        return new ResponseEntity<String>("Group with ID: " + groupID + " is deleted", HttpStatus.OK);
    }

}
