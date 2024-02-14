<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>로그인</title>
	<link rel="stylesheet" href="assets/css/Login.css">
</head>
<body>
	<video autoplay loop muted>
		<source src="assets/videos/loginbackground.mp4">
	</video>
	    <form class="login" method="post" action="login">
	        <img src="assets/imgs/medit.png" id="logo">
	        <div class="vector">
	            <input type="text" placeholder="Enter ID" class="bounceAnim" name="doctorId" required>
	            <img src="assets/imgs/login_id.png" id="people">
	        </div>
	        <div class="vector">
	            <input type="password" placeholder="Enter Password" class="bounceAnim" name="doctorPw" required>
	            <img src="assets/imgs/login_pw.png" id="key">
	        </div>
	        <input type="submit" value="Login">
	    </form>
	    
	<script src="assets/js/Login.js"></script>
</body>
</html>