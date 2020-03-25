package com.xiandabai.moviewebsite.services;

import com.xiandabai.moviewebsite.domain.Group;
import com.xiandabai.moviewebsite.repositories.GroupRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupService {

    @Autowired
    ValidationErrorService validationErrorService;

    @Autowired
    GroupRespository groupRespository;

    public Group saveOrUpdateGroup(Group group) {
        return groupRespository.save(group);
    }

    public Group findByGroupID(Long id) {
        return groupRespository.getById(id);
    }

    public void deleteGroupById(Long id) {
        Group group = findByGroupID(id);
        groupRespository.delete(group);
    }

    public Iterable<Group> findAllGroups() {
        return groupRespository.findAll();
    }

}
