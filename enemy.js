document.addEventListener("DOMContentLoaded", function() {
    
    // ประกาศตัวแปรโดยรับค่าจาก game boar
    var gameBoard = document.getElementById('game-board');

    //ประกาศตัวแปรโดยรับค่าจาก inv
    var inventoryItems = document.querySelectorAll('.inv');

    // ฟังก์ชันในการ เกิดของอุกาบาตแบบสุ่ม ให้ตกลงมาจากข้างบนของหน้าจอ
    function respawnEnemy() {
        // เช็คว่าเกมโอเวอร์รึยัง
        var modalOverlay = document.getElementById('modal-overlay');
        if (modalOverlay.style.display === 'flex') {
        // หากเกมหยุดแล้วให้หยุดสุ่มอุกาบาตที่ตกลงมา
            return;
        }

        // การสร้างอุกาบาตลูกใหม่
        var newEnemy = document.createElement('div');
        newEnemy.className = 'enemy';
        newEnemy.style.display = 'block';
        newEnemy.textContent = Math.floor(Math.random() * 9) + 1; // Random number between 1 and 100 // สุ่มค่าในอุกาบาตจาก 1 ถึง 9 

        // สุ่มแสดง ว่าออกจากซ้ายหรือขวา
        var gameBoardWidth = gameBoard.clientWidth;
        var enemyWidth = newEnemy.clientWidth;
        var randomLeft = Math.random() * (gameBoardWidth - enemyWidth); // Adjusted for enemy width
        newEnemy.style.left = (randomLeft+20) + 'px';

        // การเพิ่มอุกาบาต
        gameBoard.appendChild(newEnemy);

        // เสียงตอนคลิกอุกาบาต เพื่อแสดงให้รู้ว่าเราเก็บค่ามาแล้วนะ
        var ballSound = document.getElementById("ballSound");
        ballSound.volume = 0.2;
        newEnemy.addEventListener('click', function() {
            ballSound.play();
            collectNumber(this);
        });

        // อัพเดทการสุ่มการตกของอุกาบาต 
        updatePosition(0, newEnemy);
        }

            //ฟังก์ชันการอัพเดทของบรรทัดที่ 50
        function updatePosition(currentPosition, enemy) {
            // ความเร็วในการตกของอุกาบาต
            var speed = 2 ; // Adjust as needed

            currentPosition += speed;
            enemy.style.top = currentPosition + 'px';

            //อัปเดตตำแหน่งอุกกาบาต
            enemy.style.left = 'calc(10% + ' + Math.random() * + 'px)';

            //รับค่าความสูงของกระดานเกม
            var gameBoardHeight = gameBoard.clientHeight;

            //ตรวจสอบว่าอุกกาบาตไปถึงจุดต่ำสุดของกระดานเกมหรือยัง
            if (currentPosition >= gameBoardHeight - enemy.clientHeight) {
                //ลบอุกาบาตออกจากกระดานเกม
                gameBoard.removeChild(enemy);
            } else {
                //อัปเดตตำแหน่งต่อไป
                requestAnimationFrame(function() {
                    updatePosition(currentPosition, enemy);
                });
            }
    }

    //ฟังก์ชันเก็บเลขจากอุกกาบาต
    function collectNumber(enemy) {
        //รับหมายเลขจากอุกกาบาต
        var number = parseInt(enemy.textContent);

        // เช็คพื้นที่ในกระเป๋าว่างมั้ย
        for (var i = 0; i < inventoryItems.length; i++) {
            if (inventoryItems[i].textContent === '') {
                // ใส่ตัวเลขของอุกาบาตในช่องเก็บของ
                inventoryItems[i].textContent = number;
                // ลบอุกาบาตออกจากหน้าจอ
                gameBoard.removeChild(enemy);
                // จบลูป
                return;
            }
        }

        if (inventoryItems[0].textContent !== '' && inventoryItems[1].textContent !== '') {
            // เอาค่าข้างหน้าออกจากกระเป๋า
            var shiftedNumber1 = parseInt(inventoryItems[0].textContent);
            returnToInventory(shiftedNumber1);
            // ย้าย ตัวหลังไปไว้ที่ตัวด้านหน้า
            inventoryItems[0].textContent = inventoryItems[1].textContent;
            // เคลียร์ ตัวหลังในกระเป๋า แทนที่ด้วยตัวใหม่
            inventoryItems[1].textContent = number;
            // ลบอุกาบาตออกจากจอ
            gameBoard.removeChild(enemy);
            // จบลูป
            return;
        }
    }

    // ฟังก์ชันเก็บค่าเข้ากระเป๋า
    function returnToInventory(number) {
        // เช็คว่ากระเป๋ามีที่ว่างมั้ย
        for (var i = 0; i < inventoryItems.length; i++) {
            if (inventoryItems[i].textContent === '') {
                // เอาค่าในอุกาบาตมาใส่กระเป๋า
                inventoryItems[i].textContent = number;
                return true;
            }
        }
        return false;
    }

    //ระยะเวลาเกิดใหม่ของอุกาบาต
    setInterval(respawnEnemy, 1000);
});
