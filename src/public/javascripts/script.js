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

// When the user clicks on the button, open the modal 
var open_modal = document.getElementById("book_btn");
open_modal.onmouseup = function() {
  modal.style.display = "block";
}
// When the user clicks on x, close the modal
var close_modal = document.getElementById("close_modal");
close_modal.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// When the user clicks on the add options, open options 
var open_options = document.getElementById("open_options");
open_options.addEventListener("click", function() {
  this.classList.toggle("active");
  var options_grid = this.nextElementSibling;
  if (options_grid.style.maxHeight)
  {
    options_grid.style.maxHeight = null;
    options_grid.style.visibility = "hidden";
    options_grid.style.padding = "0";
  } 
  else 
  {
    options_grid.style.maxHeight = options_grid.scrollHeight + "px";
    options_grid.style.visibility = "visible";
    options_grid.style.padding = "2%";
  } 
});
/////////////////////