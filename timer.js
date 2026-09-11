document.addEventListener("DOMContentLoaded", function() {
    // กำหนดค่าตัวแปรที่จำเป็นต้องใช้
    var startTime;
    var endTime;
    var gameDuration = 60; // ระยะเวลาของเกมสามารถปรับได้จากตรงนี้
    var timerDisplay = document.getElementById('timer');
    
    // ฟังก์ชั่นที่กำหนดเมื่อรันโค้ตแล้วจะเริ่มเกม
    startGame();

    // ฟังก์ชั่นเริ่มเกม
    function startGame() {
        // ตั้งเวลาเริ่มการ
        startTime = Date.now();

        // คำนวณเวลาจบเกม
        endTime = startTime + gameDuration * 1000;

        // เริ่มฟังก์ชั่นการอัพเดตเวลาต่อวิ
        updateTimer();

        // เริ่มฟังก์ชั่นสำหรับการจบเกมเมื่อถึงเวลาที่เซ็ตไว้
        setTimeout(endGame, gameDuration * 1000);
    }


    // ฟังก์ชั่นสำหรับการอัพเดตเวลา
    function updateTimer() {
        var remainingTime = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        var minutes = Math.floor(remainingTime / 60);
        var seconds = remainingTime % 60;
        timerDisplay.textContent = 'Time: ' + formatTime(minutes) + ':' + formatTime(seconds);

        // การอัพเดตเวลาต่อวินาที
        if (remainingTime > 0) {
            setTimeout(updateTimer, 1000);
        }
    }

    // ฟังก์ชั่นกำหนด Format ของเวลาที่จะโชว์เพื่อให้ง่ายสำหรับการใช้แต่ละที
    function formatTime(time) {
        return (time < 10 ? '0' : '') + time;
    }

    function showGameOverModal() {
        var modalOverlay = document.getElementById('modal-overlay');
        modalOverlay.style.display = 'flex';
    }

    // ฟังก์ชั่นสำหรับการจบเกม
    function endGame() {
    // สลับหน้าต่างแสดงคะแนนที่ซ่อนเอาไว้อยู่ขึ้นมา จากนั้นอัพเดตคะแนน

    showGameOverModal();
    var finalScore = document.getElementById('game-score').textContent;
    var resultshow = document.getElementById('score-results');

    resultshow.innerHTML = 'Game Over! <br> Your final score <br>' + finalScore;

    // กำหนดตัวแปรให้กับปุ่มเริ่มใหม่และปุ่มเปิดเกม
    var retryButton = document.getElementById('retry-button');
    retryButton.addEventListener('click', function() {
        // กำหนดให้รีหน้าเว็ปตนเองเมื่อกดปุ่ม
        location.reload();
    });

    var closeButton = document.getElementById('main-menu-button');
    closeButton.addEventListener('click', function() {
        // กำหนดให้ส่งกลับไปที่หน้า Home เมื่อกดปิด
        window.location.href = './home.html';
    });
}});


