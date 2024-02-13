package com.notnulliwant.medit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.notnulliwant.medit.entity.Chatroom_Members;

@Repository
public interface ChatroomMembersRepository extends JpaRepository<Chatroom_Members, Integer>{

}
