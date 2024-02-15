<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>소견서 작성</title>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script defer src="assets/js/test.js"></script>
<style>
body {
	background-color: #f2f2f2;
	font-family: 'Arial', sans-serif;
	margin: 0;
	padding: 0;
}

.side-boxes {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 50px;
	background-color: #007bff;
	color: #fff;
}

.side-box {
	margin-top: 5px;
	width: 30px;
	height: 30px;
	background-color: #fff;
	color: #007bff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 10px;
	cursor: pointer;
}

.memo-container {
	max-width: 600px;
	margin: 50px auto;
	padding: 20px;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	margin-left: 60px; /* Adjusted to make space for side boxes */
}

h1 {
	text-align: center;
	color: #333;
	border-bottom: 2px solid #333;
	padding-bottom: 10px;
}

.oval {
	position: relative;
	margin: 20px 0;
	text-align: left;
}

.oval:before {
	content: "";
	display: block;
	position: absolute;
	top: -10px;
	left: -10px;
	width: 100%;
	height: 40px;
	background-color: #fff;
	border-radius: 50%;
}

.oval-text {
	position: relative;
	z-index: 1;
	font-size: 18px;
	font-weight: bold;
	padding: 10px;
	background-color: #f2f2f2;
	border-radius: 10px;
	display: inline-block;
}

form {
	margin-top: 20px;
}

textarea {
	width: 100%;
	margin-bottom: 10px;
	padding: 8px;
	box-sizing: border-box;
}

input[type="submit"] {
	background-color: #007bff;
	color: #fff;
	padding: 10px;
	cursor: pointer;
}

input[type="submit"]:hover {
	background-color: #0056b3;
}

.edit-icon {
	position: fixed;
	bottom: 20px;
	right: 20px;
	width: 30px;
	height: 30px;
	background-color: #007bff;
	color: #fff;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

.edit-form {
	display: none;
	position: fixed;
	bottom: 70px;
	right: 20px;
	background-color: #fff;
	padding: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.edit-form textarea {
	width: 100%;
	margin-bottom: 10px;
	padding: 8px;
	box-sizing: border-box;
}

.edit-form button {
	background-color: #007bff;
	color: #fff;
	padding: 8px;
	cursor: pointer;
}

.edit-form button:hover {
	background-color: #0056b3;
}
</style>
</head>
<body>
	<div class="side-boxes">
		<div class="side-box" onclick="loadPatientInfo(1)">1</div>
		<div class="side-box" onclick="loadPatientInfo(2)">2</div>
		<div class="side-box" onclick="loadPatientInfo(3)">3</div>
	</div>

	<div class="memo-container">
		<h1>환자 소견서</h1>

		<div class="oval">
			<div class="oval-text">담당의 소견</div>
		</div>

		<form>
			<textarea id="content" rows="15" cols="50"></textarea>
			<br>
			<button id="submitBtn">등록</button>
		</form>
	</div>

	<div class="edit-icon" onclick="openEditForm()">✎</div>
	<!-- 여기가 클릭하면 오픈인가봉가? -->

	<!-- 수정 폼 추가 -->
	<div class="edit-form">
		<textarea id="editContent" rows="10" cols="30"></textarea>
		<br>
		<button onclick="submitEdit()">수정 완료</button>
	</div>

	<script>

		function loadPatientInfo(patientNumber) {
			// AJAX 또는 서버 호출을 사용하여 해당 번호의 환자 정보를 가져온다.
			// 가져온 정보를 사용하여 페이지의 환자 증상 입력란에 표시
			// 아래는 가상의 예시로 가져온 데이터를 content 입력란에 적용하는 부분
			var patientInfo = "환자 " + patientNumber + "의 증상이 여기에 표시됩니다.";
			document.getElementById("content").value = patientInfo;
		}

		 

		    function openEditForm() {
		      var currentContent = document.getElementById("content").value;
		      document.getElementById("editContent").value = currentContent;
		      document.querySelector(".edit-form").style.display = "block";
		    }

		    function submitEdit() {
		      var editedContent = document.getElementById("editContent").value;
		      document.getElementById("content").value = editedContent;
		      document.querySelector(".edit-form").style.display = "none";
		    }

		    function submitDiagnosis() {
		      var content = document.getElementById("content").value;
		      var patientNumber = 1; // 예시로 고정된 환자 번호
		      // AJAX를 사용하여 서버에 소견서 등록 요청
		      // ...
		    }
		  </script>



	</div>
</body>
</html>