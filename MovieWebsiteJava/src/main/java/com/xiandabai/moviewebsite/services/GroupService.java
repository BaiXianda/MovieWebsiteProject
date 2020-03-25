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

    

}
