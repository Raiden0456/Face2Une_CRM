//Bubbly button animation//
var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };
  
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }
  //////////////////////////

  //Modal for booking//
  var modal = document.getElementById("book_modal");
  var btn = document.getElementById("book_btn");

  btn.onmouseup = function() {
    modal.style.display = "block";
  }
  /////////////////////