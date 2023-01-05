// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  var saveButtons = $('.saveBtn');
  for (var i = 0; i < saveButtons.length; i++) {
    saveButtons[i].addEventListener("click", function() {
      var value = this.parentElement.children[1].value;
      if (value.trim() != '') {
        window.localStorage.setItem(this.parentElement.id, value);
      }
    })
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var timeBlocks = $('.time-block');

  for (var i = 0; i < timeBlocks.length; i++) {
    var timeBlock = timeBlocks[i];
    var timeBlockString = timeBlock.firstElementChild.textContent;
    var timeBlockHour =  parseInt(timeBlockString.slice(0,timeBlockString.length - 2));
    var timeBlockConvention = timeBlockString.slice(timeBlockString.length - 2, timeBlockString.length);

    if (timeBlockConvention === "PM" && timeBlockHour != 12) {
        timeBlockHour += 12;
    }

    var timeBlockTime = dayjs().hour(timeBlockHour);
    timeBlockTime = timeBlockTime.minute(00);
    timeBlockTime = timeBlockTime.second(00);

    var topOfTheHour = dayjs();
    topOfTheHour = topOfTheHour.hour(00);
    topOfTheHour = topOfTheHour.minute(00);

    if (timeBlockTime.isSame(topOfTheHour)) {
      timeBlock.className = timeBlock.className + " present";
    } else if (timeBlockTime.isBefore(topOfTheHour)) {
      timeBlock.className = timeBlock.className + " future";
    } else if (timeBlockTime.isAfter(topOfTheHour)){
      timeBlock.className = timeBlock.className + " past";
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  for (var i = 0; i < timeBlocks.length; i++) {
    var timeBlock = timeBlocks[i];
    var storedValue = window.localStorage.getItem(timeBlock.id);
    if (storedValue != null) {
      timeBlock.children[1].value = storedValue;
    }
  }

  // TODO: Add code to display the current date in the header of the page.
  var currentDate = dayjs().format('MMM D, YYYY'); 
  $('#currentDay').text(currentDate);
});
