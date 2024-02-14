<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>환자 정보 입력</title>
<style>
#submit { text-align: center;}
</style>
</head>
<body>
<form action="savePatient" method="post">
	<div style="line-height:130%; font-size:17px; font-family:맑은고딕;">
    [환자명]<br> 
    <input name="ptntName" type="text"  placeholder="환자명을 입력하세요">
    <br>
  	<div style="line-height:130%; font-size:17px; font-family:맑은고딕;">
  	<br>
    [성별] <br>
    <input type="radio" name="ptntGender" value="0">남
    <input type="radio" name="ptntGender" value="1">여
    </div> 
    <br>
    [생년월일]<br>
    <input type="date" name="ptntBirthdate"><br><br> 
    [연락처] <input type="text" name="ptntPhone"><br>
    [담당의] <input type="text" name="doctorId"><br>
    <br>
    [주소]<br>

<input type="text" id="sample4_postcode" placeholder="우편번호" name="addr3">
<input type="button" onclick="sample4_execDaumPostcode()" value="우편번호 찾기"><br>
<input type="text" id="sample4_roadAddress" placeholder="도로명주소" size="60"name="addr1" ><br>
<input type="hidden" id="sample4_jibunAddress" placeholder="지번주소"  size="60">
<span id="guide" style="color:#999;display:none"></span>
<input type="text" id="sample4_detailAddress" placeholder="상세주소"  size="60" name="addr2"><br>
<input type="hidden" id="sample4_extraAddress" placeholder="참고항목"  size="60">
<input type="hidden" id="sample4_engAddress" placeholder="영문주소"  size="60" ><br>
    
    <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script>
    //본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
    function sample4_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('sample4_postcode').value = data.zonecode;
                document.getElementById("sample4_roadAddress").value = roadAddr;
                document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
         
                document.getElementById("sample4_engAddress").value = data.addressEnglish;
                       
                // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
                if(roadAddr !== ''){
                    document.getElementById("sample4_extraAddress").value = extraRoadAddr;
                } else {
                    document.getElementById("sample4_extraAddress").value = '';
                }

                var guideTextBox = document.getElementById("guide");
                // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
                if(data.autoRoadAddress) {
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                    guideTextBox.style.display = 'block';

                } else if(data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                    guideTextBox.style.display = 'block';
                } else {
                    guideTextBox.innerHTML = '';
                    guideTextBox.style.display = 'none';
                }
            }
        }).open();
    } 
    
    
    
</script>

<!-- 등록일(hidden 필드 추가) -->
    <input type="hidden" name="registeredAt" value="<%= new java.util.Date() %>">
    <div id="submit">
     <input type="submit" value="제출">
     </div>
     
   <!-- Scripts -->
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/jquery.scrollex.min.js"></script>
			<script src="assets/js/skel.min.js"></script>
			<script src="assets/js/util.js"></script>
			<!--[if lte IE 8]><script src="assets/js/ie/respond.min.js"></script><![endif]-->
			<script src="assets/js/main.js"></script>	

    
    
</form>
</body>
</html>