package com.xiandabai.moviewebsite.controllers;

import com.xiandabai.moviewebsite.domain.Group;
import com.xiandabai.moviewebsite.services.GroupService;
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
public class GroupController {

    @Autowired
    private GroupService groupService;

    @Autowired
    private ValidationErrorService validationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewGroup(@Valid @RequestBody Group group, BindingResult result) {
        ResponseEntity<?> errorMap = validationErrorService.MapValidationService(result);
        if(errorMap != null)
            return errorMap;

        Group newGroup = groupService.saveOrUpdateGroup(group);
        return new ResponseEntity<Group>(newGroup, HttpStatus.CREATED);
    }

    @GetMapping("/{groupID}")
    public ResponseEntity<?> getGroupByGroupID(@PathVariable String id) {
        Group group = groupService.findByGroupID(id);

        return new ResponseEntity<Group>(group, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Group> getAllGroups() {
        return groupService.findAllGroups();
    }

    @DeleteMapping("/{groupID}")
    public ResponseEntity<?> deleteGroup(@PathVariable String id) {
        groupService.deleteGroupByGroupId(id);
        return new ResponseEntity<String>("Group with ID: " + id + " is deleted", HttpStatus.OK);
    }

}
