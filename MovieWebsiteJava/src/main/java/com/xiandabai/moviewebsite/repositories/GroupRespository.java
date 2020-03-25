package com.xiandabai.moviewebsite.repositories;

import com.xiandabai.moviewebsite.domain.Group;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRespository extends CrudRepository<Group, Long> {
    
}
