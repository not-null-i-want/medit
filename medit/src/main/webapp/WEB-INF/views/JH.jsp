<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
			
	
		<div>
	<h1>환자 목록</h1>
		<table>
			<thead>
				<tr>
					<td>No.</td>
					<td>환자명</td>
					<td>담당의사</td>
				</tr>
			</thead>
			<tbody>
				<c:forEach  var="patient" items="${patiensList}" >
				<tr>
					<td>${patient.ptntId}</td>
					<td>${patient.ptntName}</td>
					<td>${patient.getDoctorId().getDoctorName()}</td>
				</tr>
				</c:forEach>
			</tbody>
		</table>
	</div>




</body>
</html>