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

@RestController
@RequestMapping("/api/group")
@CrossOrigin
public class MovieGroupController {

    @Autowired
    private MovieGroupService movieGroupService;

    @Autowired
    private ValidationErrorService validationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewGroup(@Valid @RequestBody MovieGroup movieGroup, BindingResult result) {
        ResponseEntity<?> errorMap = validationErrorService.MapValidationService(result);
        if(errorMap != null)
            return errorMap;

        MovieGroup newMovieGroup = movieGroupService.saveOrUpdateGroup(movieGroup);
        return new ResponseEntity<MovieGroup>(newMovieGroup, HttpStatus.CREATED);
    }

    @GetMapping("/{groupID}")
    public ResponseEntity<?> getGroupByGroupID(@PathVariable String id) {
        MovieGroup movieGroup = movieGroupService.findByGroupID(id);

        return new ResponseEntity<MovieGroup>(movieGroup, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<MovieGroup> getAllGroups() {
        return movieGroupService.findAllGroups();
    }

    @DeleteMapping("/{groupID}")
    public ResponseEntity<?> deleteGroup(@PathVariable String id) {
        movieGroupService.deleteGroupByGroupId(id);
        return new ResponseEntity<String>("Group with ID: " + id + " is deleted", HttpStatus.OK);
    }

}
