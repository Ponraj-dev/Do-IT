var selectedRow = null;

function showAlert(message,className){
    const div = document.createElement("div");
    div.className= `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container =document.querySelector(".container");
    const main =document.querySelector(".main");
    container.insertBefore(div,main);

    setTimeout(()=> document.querySelector(".alert").remove(),3000);

}

//clear all fields.
function clearFields(){
    document.querySelector("#task").value = "";
    document.querySelector("#date-time-picker").value = "";
   
}

//time formate..........................................................................................................

// function fromateTime(){

//     const inputDateTime = document.querySelector("#date-time-picker").value;
//     const dateObj = new Date(inputDateTime);
//     const formattedDateTime = dateObj.toLocaleString('en-GB', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
    
//    return (formattedDateTime); // Outputs in the format "dd-mm-yyyy hh:mm"
    


// }


//add Data..............................................................................................................
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const task = document.querySelector("#task").value;
    const time = document.querySelector("#date-time-picker").value;
   
      //validate
      if(task ==""||time ==""){
        showAlert("please fill in all feild","danger");
    }
    else{
        
        localStorage.setItem(task,time)
        //localStorage.setItem(time,time)
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row =document.createElement('tr');


            table(row,task,time);
            
            // row.innerHTML =`
            // <td>${localStorage.getItem("task")}</td>
            // <td>${time}</td>
            
            // <td>
            // <a href="#" class="btn btn-warning btn-sm edit"> edit</a>
            // <a href="#" class="btn btn-danger btn-sm delete">delete</a>
            // `;

            list.appendChild(row);
            selectedRow = null;
            showAlert("Student added", "success")
        }
        else{
            //selectedRow.children[0].textContent = task;
            selectedRow.children[1].textContent = time;
            
            selectedRow = null;
            showAlert("Task Info Edited", "info")
        }
        clearFields();
    }
  
});

//edit data

document.querySelector("#student-list").addEventListener("click", (e) =>{
    target =e.target;
    if(target.classList.contains("edit")) {
        var remove = target.parentElement.parentElement.id;
       
        selectedRow = target.parentElement.parentElement;
        
        document.querySelector("#task").value = selectedRow.children[0].textContent;
        document.querySelector("#date-time-picker").value = selectedRow.children[1].textContent;
        
        
    }
})



//delete
document.querySelector("#student-list").addEventListener("click",(e) => {
    target =e.target;
    
    if(target.classList.contains("delete")) {
        var remove = target.parentElement.parentElement.id;
        console.log(target.parentElement.parentElement.id)
        target.parentElement.parentElement.remove();
       //localStorage.removeItem()
     
        localStorage.removeItem(remove)
        showAlert("Task completed ","info");
    }
}
);

// display task table....................................................................................................................

function table(row,task,time){
    console.log(task)
    row.innerHTML =`
    <td>${"Task added...k"}</td>
    <td>${localStorage.getItem(task)}</td>
    
    <td>
    <a href="#" class="btn btn-light btn-sm edit"> edit</a>
    <a href="#" class="btn btn-info btn-sm delete">delete</a>
    `;

}


window.addEventListener("load",()=>{


for(let i=0; i<localStorage.length; i++) {
    
    const list = document.querySelector("#student-list");
    const row =document.createElement('tr');
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
   row.id=key;
    row.innerHTML =`
    <td>${key}</td>
    <td>${value}</td>
    
    <td>
    <a href="#" class="btn btn-light btn-sm edit"> edit</a>
    <a href="#" class="btn btn-info btn-sm delete">Done</a>
    `;
    list.appendChild(row);


}
})
 


//date time picker for alram..............................................................................................................


const dateTimePicker = document.getElementById("date-time-picker");

// add a change event listener to the date-time picker
dateTimePicker.addEventListener("change", () => {
  // get the selected date and time
  const selectedDateTime = new Date(dateTimePicker.value);
  
  // get the current date and time
  const currentDateTime = new Date();

  // calculate the time difference in milliseconds
  const timeDifference = selectedDateTime.getTime() - currentDateTime.getTime();

  // set a timeout for the time difference to alert the user
  setTimeout(() => {
   sendNotification();
  }, timeDifference);
});

//sent notification..................................................................................................................................................................



function sendNotification() {
    
    if ("Notification" in window) {
      // Let's check whether notification permissions have already been granted
      if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification("Hello, World!");
      }
  
      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            var notification = new Notification("Hello, World!");
          }
        });
      }
    }
  }