package com.xiandabai.moviewebsite.services;

import com.xiandabai.moviewebsite.domain.Event;
import com.xiandabai.moviewebsite.domain.MovieList;
import com.xiandabai.moviewebsite.exceptions.MovieListIDException;
import com.xiandabai.moviewebsite.repositories.EventRepository;
import com.xiandabai.moviewebsite.repositories.MovieListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private MovieListRepository movieListRepository;

    @Autowired
    private MovieGroupService movieGroupService;

    public Event saveOrUpdateEvent(Event event) {
        if(event.getId() == null) {
            MovieList movieList = movieListRepository.getById(event.getMovieListId());
            if (movieList == null) {
                throw new MovieListIDException("there is no movieList with this ID exist in your group");
            } else if (!movieList.getMovieGroupID().equals(event.getEventGroupId())) {
                throw new MovieListIDException("there is no movieList with this ID exist in your group test");
            }

        } else {
            Event newEvent = eventRepository.getById(event.getId());
            newEvent.setEventName(event.getEventName());
            newEvent.setDescription(event.getDescription());
            newEvent.setVoteStartTime(event.getVoteStartTime());
            newEvent.setVoteEndTime(event.getVoteEndTime());
        }
        event.setMovieGroup(movieGroupService.findByGroupID(event.getEventGroupId()));

        return eventRepository.save(event);
    }

    public Iterable<Event> getAllEventByMovieGroupId(String movieGroupId) {
        return eventRepository.findByEventGroupId(movieGroupId);
    }

    public Iterable<Event> getAllEvent() {
        return eventRepository.findAll();
    }

    public Event getEvent(Long id) {
        return eventRepository.getById(id);
    }

    public void deleteEvent(Long id) {
        Event event = eventRepository.getById(id);
        eventRepository.delete(event);
    }

}
