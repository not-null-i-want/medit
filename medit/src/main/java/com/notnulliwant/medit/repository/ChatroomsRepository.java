package com.notnulliwant.medit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.notnulliwant.medit.entity.Chatrooms;

@Repository
public interface ChatroomsRepository extends JpaRepository<Chatrooms, Integer>{

}
