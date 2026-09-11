document.addEventListener("DOMContentLoaded", function() {
    // เรียกใช้ตัวแปรที่จำเป็นในการใช้งานไอเท็มในช่องเก็บของ
    var inventoryItems = document.querySelectorAll('.inv');
    var number1 = document.getElementById('number1');
    var number2 = document.getElementById('number2');

    // สร้าง Array สำหรับเก็บตัวเลขที่อยู่ใน ช่องเก็บของ
    var numbers = [];

    //ฟังก์ชันที่จะส่งตัวเลขไปไว้ในช่องเก็บตัวเลข
    function returnToInventory(number) {
        //ตรวจสอบว่าช่องเก็บตัวเลขมีพื้นที่ว่างหรือไม่
        for (var i = 0; i < inventoryItems.length; i++) {
            if (inventoryItems[i].textContent === '') {
                //วางตัวเลขในช่องเก็บตัวเลขที่ว่าง
                inventoryItems[i].textContent = number;
                return true;
            }
        }
        return false;
    }

    // เพิ่มฟังก์ชั่นให้กับช่องเก็บคำนวณที่ 1
    number1.addEventListener('click', function() {
        // นำตัวเลขจาก number1 ไปใช้
        var number = parseInt(number1.textContent);
        if (!isNaN(number)) {
            // ดึงตัวเลขตัวที่ 2 หรือที่อยู่ด้านหลังใน Array ออกมา
        numbers.pop(number);
            // ส่งค่ากลับไปที่ inventory
            if (returnToInventory(number)) {
                // เอาเลขที่เก็บไว้ใน  number1 ออก
                number1.textContent = '';
            }
        }
    });

    // เพิ่มฟังก์ชั่นให้กับช่องเก็บคำนวณที่ 2
    number2.addEventListener('click', function() {
        // กำหนดตัวแปรของตัวเลขจากค่าที่อยู่ในช่องเก็บคำนวณ
        var number = parseInt(number2.textContent);
        if (!isNaN(number)) {
            // ดึงตัวเลขตัวที่ 2 หรือที่อยู่ด้านหลังใน Array ออกมา
            numbers.pop(number);
            // นำเลขกลับไปที่ช่องเก็บของ
            if (returnToInventory(number)) {
                // เมื่อทำงานแล้วก็จึงเคลียร์การแสดง
                number2.textContent = '';
            }
        }
    });

    // กำหนดฟังชั่นก์ที่จะทำงานเมื่อช่องเก็บของในแต่ละช่องถูกคลิก
    inventoryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // กำหนดตัวแปรของตัวเลขจากช่องเก็บของ
            var number = parseInt(item.textContent);

            // ตรวจสอบว่าตัวเลขที่รับมานั้นเป็นตัวเลขจริง ๆ หรือ NaN(not a number)
            if (!isNaN(number)) {
                // เพิ่มตัวเลขในตัวของ Array
                numbers.push(number);

                // ตรวจสอบช่องตัวเลขที่หน้าต่างคำนวณในแต่ละช่อง
                if (number1.textContent === '') {
                    // หากช่องที่ 1 ว่างก็นำตัวเลขมาใส่
                    number1.textContent = number;
                    // เคลียร์ตัวเลขที่อยู่ด้านในช่องเก็บของที่กด
                    item.textContent = '';
                } else if (number2.textContent === '') {
                    // หากช่องที่ 2 ว่างก็นำตัวเลขมาใส่
                    number2.textContent = number;
                    // เคลียร์ตัวเลขที่อยู่ด้านในช่องเก็บของที่กด
                    item.textContent = '';
                }
                // หากว่าที่หน้าต่างคำนวณมีตัวเลขในทุกช่องอยู่แล้ว ก็ไม่ต้องทำอะไร
            }
        });
    });
});
