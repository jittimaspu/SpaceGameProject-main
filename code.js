document.addEventListener("DOMContentLoaded", function() {
    // ตัวแปรเครื่องหมาย + - x /
    var operators = document.querySelectorAll('.operator');

    // เพิ่ม function ให้เครื่องหมายแต่ละปุ่ม
    operators.forEach(function(operator) {
        operator.addEventListener('click', function() {
            // รับสัญลักษณ์ตัวดำเนินการเมื่อคลิ๊ก
            var symbol = this.textContent;

            // อัพเดทตัวดำเนินการใหม่เมื่อคลิ๊ก(แทนที่ตัวดำเนินการเดิม)
            var calcuDiv = document.getElementById('opera');
            calcuDiv.textContent = symbol;

            // ตั้งระยะเวลา cooldown เครื่องหมาย
            var cooldownDuration = 7000; // 3 seconds

            // เรียกใช้ function ปิดการใช้งาน (cooldown) เครื่องหมาย
            disableOperator(operator, cooldownDuration, symbol);
        });
    });

    // ฟังก์ชันคลูดาวน์และแสดงการนับเวลาถอยหลัง
        function disableOperator(operator, cooldownDuration, symbol) {
        // รับสัญลักษณ์ปัจจุบันก่อนอัปเดต
        var currentSymbol = operator.textContent;

        // ปิดการใช้งานตัว operator โดยการเพิ่มคลาส disable ให้ operator
        operator.classList.add('disabled');

        // ตั้งเวลาเวลา time out ให้สามารถใช้เครื่องหมายได้อีกรอบ
        
        var startTime = Date.now();
        var endTime = startTime + cooldownDuration;

        updateTimer(operator, endTime);

        var timerInterval = setInterval(function() {
            updateTimer(operator, endTime);

            // เช็คว่าหมดเวลาคลูดาวน์หรือยัง
            if (Date.now() >= endTime) {
                // เปิดใช้งานตัวสัญลักษณ์อีกครั้งโดยการลบคลาส 'disabled'
                operator.classList.remove('disabled');

                // ถ้าคูลดาวน์หมดแล้วให้กลับมาใช้สัญลักษณ์นั้นได้
                if (operator.textContent !== symbol) {
                    operator.textContent = symbol;
                }

                clearInterval(timerInterval);
            }
        }, 1000);
    }

    // อัพเดทเวลาคลูดาวน์ของเครื่องหมายคำนวณที่หน้าจอ
    function updateTimer(operator, endTime) {
        var remainingTime = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        operator.textContent = remainingTime + 's';
    }
})