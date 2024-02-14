<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>의사 로그인</title>
</head>
<body>
    <h2>의사 로그인</h2>
    <form id="login" action="login" method="post">
        <div>
            <label for="doctorId">아이디:</label>
            <input type="text" id="doctorId" name="doctorId" required>
        </div>
        <div>
            <label for="doctorPw">비밀번호:</label>
            <input type="password" id="doctorPw" name="doctorPw" required>
        </div>
        <button type="submit">로그인</button>
    </form>
    
    <!-- 로그인 실패 시 에러 메시지 표시 -->
    <c:if test="${not empty errorMessage}">
        <div style="color: red;">${errorMessage}</div>
    </c:if>
    
    <script src="assets/js/jquery-3.7.1.min.js"></script>
    <script src="assets/js/login.js"></script>
    
</body>
</html>
