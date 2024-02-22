package com.notnulliwant.medit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.notnulliwant.medit.entity.Chatrooms;
import com.notnulliwant.medit.entity.Chattings;

@Repository
public interface ChattingsRepository extends JpaRepository<Chattings, Integer>{

	public List<Chattings> findAllByRoomSeq(Chatrooms RoomSeq);
	
}
