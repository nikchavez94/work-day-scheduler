// Function to update the date and time
function updateDateTime() {
    var currentDateTime = dayjs().format("MMMM DD, YYYY h:mm A");
    $("#currentDateTime").text(currentDateTime);
  }
  
  // Call to set the date and time when the page loads
  updateDateTime();
  
  // Update the date and time every minute
  setInterval(updateDateTime, 60000); // 60000 milliseconds = 1 minute
  
  //Loads the timeblocks of 9AM - 5PM
    // Create time blocks from 9AM to 5PM
    for (var hour = 9; hour <= 17; hour++) {
      var ampm = hour < 12 ? "AM" : "PM";
      var displayHour = hour <= 12 ? hour : hour - 12;
      var timeBlockID = "hour-" + hour;
  
      // Create the HTML structure for each time block
      var timeBlockHTML = `
        <div id="${timeBlockID}" class="row time-block">
          <div class="col-2 col-md-1 hour text-center py-3">${displayHour}${ampm}</div>
          <textarea class="col-8 col-md-10 description" rows="3"></textarea>
          <button class="btn saveBtn col-2 col-md-1" aria-label="save">
            <i class="fas fa-save" aria-hidden="true"></i>
          </button>
        </div>
      `;
  
      // Append the time block to the container
      $(".container-fluid").append(timeBlockHTML);
    };

    // Function to update time block colors based on the current time
function updateTimeBlockColors() {
  var currentHour = dayjs().hour(); // Get the current hour using dayjs

  // Loop through time blocks (assuming IDs are in the format 'hour-X')
  for (var hour = 9; hour <= 17; hour++) {
    var timeBlock = $("#hour-" + hour);

    // Check if the current hour is equal to the hour of the time block
    if (currentHour === hour) {
      timeBlock.addClass("present");
    } else if (currentHour > hour) {
      timeBlock.addClass("past");
    } else {
      timeBlock.addClass("future");
    }
  }
}

// Call the function to initially set time block colors
updateTimeBlockColors();

// Update the time block colors every minute (optional)
setInterval(updateTimeBlockColors, 60000); // 60000 milliseconds = 1 minute

$(document).ready(function () {
  // This code is executed when the HTML document is fully loaded and ready.

  // Function to save text to local storage
  function saveToLocalStorage(hour) {
    // Select the textarea element within the specified time block
    var textArea = $("#hour-" + hour + " textarea");
    
    // Get the text (value) entered in the textarea
    var text = textArea.val();
    
    // Save the text to local storage with a key that includes the hour
    localStorage.setItem("hour-" + hour, text);
  }

  // Function to load text from local storage and display it
  function loadFromLocalStorage(hour) {
    // Retrieve the text associated with the specified hour from local storage
    var text = localStorage.getItem("hour-" + hour);
    
    // Check if there is text stored for this hour
    if (text) {
      // If text is found, set the value of the corresponding textarea to display it
      $("#hour-" + hour + " textarea").val(text);
    }
  }

  // Loop through hours from 9 to 17
  for (var hour = 9; hour <= 17; hour++) {
    // Add a click event listener to the save button in each time block
    $("#hour-" + hour + " .saveBtn").on("click", function () {
      // Find the closest time block to the clicked button and get its ID
      var hourId = $(this).closest(".time-block").attr("id");
      
      // Extract the hour value from the time block's ID
      var hour = parseInt(hourId.split("-")[1]);
      
      // Save the text from the textarea to local storage
      saveToLocalStorage(hour);
      
      // Load and display the saved text from local storage
      loadFromLocalStorage(hour);
    });

    // Load text from local storage for the current hour when the page loads
    loadFromLocalStorage(hour);
  }
});
