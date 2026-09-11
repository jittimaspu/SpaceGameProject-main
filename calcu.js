document.addEventListener("DOMContentLoaded", function() {
    // กำหนด Array ที่ไว้เก็บคะแนน
    var score = [];

    // ตัวแปร submit button
    var submitButton = document.getElementById('submit-button');

    // ปุ่มคลิ๊ก submit
    submitButton.addEventListener('click', function() {
        //รับเลขและเครื่องหมายตอนคำนวน
        var number1 = document.getElementById('number1').textContent;
        var operator = document.getElementById('opera').textContent;
        var number2 = document.getElementById('number2').textContent;

        if (number1.trim() === '' || number2.trim() === '') {
            console.log('Please enter both numbers.');
            return;
        }

        // เช็คเครื่องหมายคำนวน
        var result;
        switch (operator) {
            case '+':
                result = parseFloat(number1) + parseFloat(number2);
                break;
            case '-':
                result = parseFloat(number1) - parseFloat(number2);
                break;
            case '×':
                result = parseFloat(number1) * parseFloat(number2);
                break;
            case '÷':
                result = Math.round(parseFloat(number1) / parseFloat(number2));
                break;
            
            default:
                console.log('Invalid operator');
                return;
        }

        clearCalculator()

        // เกณฑ์คำนวณ
        var bonusSound = document.getElementById("bonusSound");
        bonusSound.volume = 0.2;
        var sumSound = document.getElementById("sumSound");
        sumSound.volume = 0.2
        switch (result) {
            case 21:
                score.push(6);
                bonusSound.play();
                break;
            case 22:
                score.push(7);
                bonusSound.play();
                break;
            case 23 :
                score.push(8);
                bonusSound.play();
                break;
            case 24:
                score.push(10);
                bonusSound.play();
                break;
            case 25:
                score.push(8);
                bonusSound.play();
                break;
            case 26:
                score.push(7);
                bonusSound.play();
                break;
            case 27:
                score.push(6);
                bonusSound.play();
                break;
            default:
                document.getElementById('number1').textContent = result;
                sumSound.play();
                break;
        }
        // อัพเดทคะแนน
        updateGameScore();
    });
    
    // เคลียร์พื้นที่คำนวน
    function clearCalculator() {
        document.getElementById('number1').textContent = '';
        document.getElementById('opera').textContent = '';
        document.getElementById('number2').textContent = '';
    }

    function updateGameScore() {
        var gameScoreDiv = document.getElementById('game-score');
        // คำนวณคะแนนทั้งหมดที่อยู่ใน Array มารวมกัน
        var sum = score.reduce((total, currentValue) => total + currentValue, 0);

        // อัพเดตคะแนนปัจจุบัน
        gameScoreDiv.innerHTML = "Score : " + sum;
    }
});
