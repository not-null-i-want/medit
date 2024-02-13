$(document).ready(function() {
    $('#login').submit(function(event) {
        event.preventDefault(); 

        var formData = $(this).serialize(); // 폼 데이터 가져오기

        $.ajax({
            type: 'POST',
            url: '/login', // 로그인 처리 URL
            data: formData,
            success: function(response) {
                // 로그인 성공 시 처리
                window.location.href = '/Test'; 
            },
            error: function(xhr, status, error) {
                // 로그인 실패 시 처리
                var errorMessage = xhr.responseText; // 서버에서 받은 에러 메시지
                if (errorMessage) {
                    alert("아이디 또는 비밀번호가 잘못되었습니다. 다시 입력해주세요."); 
                }
            }
        });
    });
});
