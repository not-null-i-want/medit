<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>소견서 작성</title>
  <style>
    body {
      background-color: #f2f2f2;
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
    }

    .memo-container {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  </style>
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script> <!-- jQuery 추가 -->
  <script>
    $(document).ready(function() {
      // 등록 버튼 클릭 시 비동기적으로 소견서를 추가하는 함수
      $("#submitBtn").click(function(e) {
        e.preventDefault();
        var content = $("#content").val(); // 텍스트 에어리어의 내용 가져오기

        // AJAX를 이용해 서버로 데이터 전송
        $.ajax({
          type: "POST",
          url: "/write",
          data: { content: content },
          success: function(response) {
            // 성공 시 실행할 코드 (ex. 화면 갱신 등)
            alert("소견서가 성공적으로 등록되었습니다.");
          },
          error: function(error) {
            // 에러 시 실행할 코드
            alert("소견서 등록에 실패했습니다.");
          }
        });
      });
    });
  </script>
</head>
<body>
<!-- 여기서부터 건듬 -->
  <div class="memo-container">
    <h1>환자 소견서</h1>

    <div class="oval">
      <div class="oval-text">담당의 소견</div>
    </div>

    <form>
        <textarea id="content" rows="15" cols="50"></textarea><br>
        <button id="submitBtn">등록</button>
    </form>
  </div>
<!-- 여기까지건듬 -->
</body>
</html>