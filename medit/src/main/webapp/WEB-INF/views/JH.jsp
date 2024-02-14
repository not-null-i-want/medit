<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>환자 목록</title>
</head>
<body>

<!-- JH 페이지 -->
<div>
    <h1>환자 목록</h1>

    <!-- 환자 검색 폼 -->
    <form id="search" action="search" method="get">
        <label for="searchName">환자명 검색: </label> 
        <input type="text" id="searchName" name="keyword">
        <button type="submit">검색</button>
    </form>

    <!-- 검색 결과 표시 -->
    <c:if test="${not empty patientsList}">
        <table>
            <thead>
                <tr>
                    <td>No.</td>
                    <td>환자명</td>
                    <td>담당의사</td>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="patient" items="${patientsList}">
                    <tr>
                        <td>${patient.ptntId}</td>
                        <td>${patient.ptntName}</td>
                        <td>${patient.getDoctorId().getDoctorName()}</td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </c:if>
</div>


</body>
</html>