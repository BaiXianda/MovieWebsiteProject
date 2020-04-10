package com.xiandabai.moviewebsite.controllers;

import com.xiandabai.moviewebsite.domain.Event;
import com.xiandabai.moviewebsite.services.EventService;
import com.xiandabai.moviewebsite.services.ValidationErrorService;
import com.xiandabai.moviewebsite.valiator.EventValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/event")
@CrossOrigin
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private ValidationErrorService validationErrorService;

    @Autowired
    private EventValidator eventValidator;

    @PostMapping("")
    public ResponseEntity<?> createEvent(@RequestBody @Valid Event event, BindingResult result) {
        eventValidator.validate(event, result);

        ResponseEntity<?> error = validationErrorService.MapValidationService(result);
        if (error != null) {
            return error;
        }

        Event event1 = eventService.saveOrUpdateEvent(event);
        return new ResponseEntity<Event>(event1, HttpStatus.CREATED);
    }

    @GetMapping("/all/{movieGroup_id}")
    public ResponseEntity<?> getAllEventByMovieGroupId(@PathVariable String movieGroup_id) {

        Iterable<Event> events = eventService.getAllEventByMovieGroupId(movieGroup_id);
        return new ResponseEntity<Iterable<Event>>(events, HttpStatus.CREATED);
    }

    @GetMapping("/{event_id}")
    public ResponseEntity<?> getEvent(@PathVariable Long event_id) {
        Event event = eventService.getEvent(event_id);
        return new ResponseEntity<Event>(event, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllEvent() {

        Iterable<Event> events = eventService.getAllEvent();
        return new ResponseEntity<Iterable<Event>>(events, HttpStatus.CREATED);
    }

    @DeleteMapping("/{event_id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long event_id) {
        eventService.deleteEvent(event_id);
        return new ResponseEntity<String>("Group with ID: " + event_id + " is deleted", HttpStatus.OK);
    }
}
