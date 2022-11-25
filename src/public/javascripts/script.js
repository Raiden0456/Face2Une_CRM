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

//When user clicks on "use my code" button, open an input field//
var open_code = document.getElementById("code_open");
open_code.addEventListener("click", function() {
  this.classList.toggle("active");
  var code_input = this.nextElementSibling;
  if (code_input.style.maxHeight)
  {
    code_input.style.maxHeight = null;
    code_input.style.visibility = "hidden";
  }
  else 
  {
    code_input.style.maxHeight = "100px";
    code_input.style.visibility = "visible";
  } 
});
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
var open_options = document.getElementById("open_options_1");
open_options.addEventListener("click", function() {
  this.classList.toggle("active");
  this.firstChild.data = this.firstChild.data == "Add options" ? "Clear and close" : "Add options";
  var options_container = this.nextElementSibling;
  if (options_container.style.maxHeight)
  {
    options_container.style.maxHeight = null;
    options_container.style.visibility = "hidden";
    options_container.style.padding = "0";
    var checkboxes = document.getElementsByName("option_checkbox_1");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
  }
  else 
  {
    options_container.style.maxHeight = options_container.scrollHeight + "px";
    options_container.style.visibility = "visible";
    options_container.style.padding = "2%";
  } 
});
/////////////////////