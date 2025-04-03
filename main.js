function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour) });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour) });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(e => e.date === date);
  let timeOut = employee.timeOutEvents.find(e => e.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, event) => {
      return total + wagesEarnedOnDate(employee, event.date);
  }, 0);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
}

// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  if (modal) {
      modal.classList.add("hidden"); // Ensure the modal is hidden initially
  }

  const likeButtons = document.querySelectorAll(".like-glyph");

  likeButtons.forEach(button => {
      button.addEventListener("click", () => {
          mimicServerCall()
              .then(() => {
                  if (button.textContent === EMPTY_HEART) {
                      button.textContent = FULL_HEART;
                      button.classList.add("activated-heart");
                  } else {
                      button.textContent = EMPTY_HEART;
                      button.classList.remove("activated-heart");
                  }
              })
              .catch(error => {
                  modal.classList.remove("hidden");
                  document.getElementById("modal-message").textContent = error;
                  setTimeout(() => modal.classList.add("hidden"), 3000);
              });
      });
  });
});


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
return new Promise(function(resolve, reject) {
  setTimeout(function() {
    let isRandomFailure = Math.random() < .2
    if (isRandomFailure) {
      reject("Random server error. Try again.");
    } else {
      resolve("Pretend remote server notified of action!");
    }
  }, 300);
});
}
