// ซ่อนถังขยะ แสดงกฎและการนับคะแนน
trashSound = document.getElementById("trashSound");
trashSound.volume = 1;
document.addEventListener('DOMContentLoaded', function() {
    var picture = document.getElementById('myImage');
    var gameRule = document.querySelector('.game-Rule');
    var scoreRule = document.querySelector('.score-Rule');
    // var originalImageSrc = picture.src;
  
    picture.addEventListener('click', function() {
      picture.style.display = 'none';
      gameRule.style.display = 'block';
      scoreRule.style.display = 'block';
      trashSound.play();
      // setTimeout(function() {
      //   picture.src = originalImageSrc;
      //   picture.style.display = 'block';
      //   gameRule.style.display = 'none';
      //   scoreRule.style.display = 'none';
      // }, 100000);
    });
  });
  