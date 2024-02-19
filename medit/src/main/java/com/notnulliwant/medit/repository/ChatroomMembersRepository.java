package com.notnulliwant.medit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.notnulliwant.medit.entity.Chatroom_Members;

@Repository
public interface ChatroomMembersRepository extends JpaRepository<Chatroom_Members, Integer>{

	@Query(value = "SELECT ROOM_SEQ FROM CHATROOM_MEMBERS WHERE DOCTOR_ID IN (?1, ?2) GROUP BY ROOM_SEQ HAVING COUNT(DISTINCT DOCTOR_ID) = 2", nativeQuery = true)
    Integer findRoomSeqByDoctorIds(String doctorId1, String doctorId2);
	
}
