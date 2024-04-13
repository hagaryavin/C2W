var newPerson = {};
var size = 0;
var allPeople = [];
var list = document.getElementById("list");
var optionList;
var optionDiv;
var optionBut;
var optionInput;
var day;
var month;
var recDate;
var tableRow = 2;
var newTask = {};
var allTasks = [];
var tasks4lols = [];
var tasks4person;
var tasks4personB4 = {};
const url =
  "https://script.google.com/macros/s/AKfycbzojs9dIr-pr54z2zCEXxklX5h1wIRBHt1ktH8Wwg9KC62R4iDaaCftIK7rHJzrjC3nVQ/exec";
const taskurl =
  "https://script.google.com/macros/s/AKfycbzbnTmtuL2kvL93Po4TiEjWks7JyJ8hg4WNu4HbVCY0OTATp1SqkEgIgkRle8dqe7sflA/exec";
var today = new Date();
var todaysDay = today.getDate();
var todaysMonth = today.getMonth() + 1;
var todaysCurrentDate = todaysDay + "." + todaysMonth;
console.log("today: " + today);
getData();
function getData() {
  getTasksDataFromPerson();
  document.getElementById("today").innerHTML =
    "היום " + todaysCurrentDate + " לבצע:";
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        newPerson = {
          name: ele.name,
          recordingdate: "",
            nextrecdate:"",
          clipscreatedate: "",
            clipssenddate:"",
          link: ele.linkfull,
          row: tableRow,
        };
        tableRow++;
        if(ele.linkfull===""){
            newPerson.link=ele.linkfive;
        }
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.recordingdate !== "")
          newPerson.recordingdate = new Date(ele.recordingdate);
        if (ele.nextrecdate !== "")
          newPerson.nextrecdate = new Date(ele.nextrecdate);
        if (ele.fixedrecordingdate !== "")
          newPerson.recordingdate = new Date(ele.fixedrecordingdate);
        if (newPerson.recordingdate !== "") {
          newPerson.clipscreatedate = new Date(
            clipsCreateDate(newPerson.recordingdate)
          );
          day = newPerson.recordingdate.getDate();
          month = newPerson.recordingdate.getMonth() + 1;
          recDate = day + "." + month;

          if (
            (newPerson.clipscreatedate < today ||
              (newPerson.clipscreatedate.getDate() === today.getDate() &&
                newPerson.clipscreatedate.getMonth() === today.getMonth() &&
                newPerson.clipscreatedate.getYear() === today.getYear())) &&
            getTasksDataFromPersonCont(newPerson.row, "clipscreate") ===
              "not yet"
          ) {
            newTask = {
              name: newPerson.name,
              recordingdate: newPerson.recordingdate,
              type: "clipscreate",
                link:newPerson.link,
              row: newPerson.row
            };

            if (!taskAlreadyExist(newTask)) {
              console.log("new task!");
              console.log(newTask);
              allTasks.push(newTask);
              changeStatus(newPerson.row, newTask.type, "add");
            }
          }
          console.log(newPerson);
          allPeople.push(newPerson);
        }
        if (newPerson.nextrecdate !== "") {
          newPerson.clipssenddate = new Date(
            clipsSendDate(newPerson.nextrecdate)
          );
          day = newPerson.recordingdate.getDate();
          month = newPerson.recordingdate.getMonth() + 1;
          recDate = day + "." + month;

          if (
            (newPerson.clipssenddate < today ||
              (newPerson.clipssenddate.getDate() === today.getDate() &&
                newPerson.clipssenddate.getMonth() === today.getMonth() &&
                newPerson.clipssenddate.getYear() === today.getYear())) &&
            getTasksDataFromPersonCont(newPerson.row, "clipssend") ===
              "not yet"
          ) {
            newTask = {
              name: newPerson.name,
              recordingdate: newPerson.recordingdate,
              type: "clipssend",
                link:newPerson.link,
              row: newPerson.row
            };

            if (!taskAlreadyExist(newTask)) {
              console.log("new task!");
              console.log(newTask);
              allTasks.push(newTask);
              changeStatus(newPerson.row, newTask.type, "add");
            }
          }
          console.log(newPerson);
          allPeople.push(newPerson);
        }
        
      });
      taskData();
    });
    
}

function getTasksDataFromPerson() {
  fetch(taskurl)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        tasks4personB4 = {
          row: ele.row,
          clipscreatestatus: ele.clipscreate8,
          clipssendstatus: ele.clipssend9,
        };
        tasks4lols.push(tasks4personB4);
      });
    });
}
function getTasksDataFromPersonCont(row, type) {
  var result = "def result";
  for (var i = 0; i < tasks4lols.length; i++) {
    if (row === tasks4lols[i].row) {
      if (type === "clipscreate") {
        result = tasks4lols[i].clipscreatestatus;
      }
      if (type === "clipssend") {
        result = tasks4lols[i].clipssendstatus;
      }
    }
  }
  return result;
}
function taskData() {
  fetch(taskurl)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        tasks4person = {
          row: ele.row,
          clipscreatestatus: ele.clipscreate8,
           clipssendstatus: ele.clipssend9,
        };
        var currPerson = getPersonFromRow(tasks4person.row);
        if (tasks4person.clipscreatestatus === "active") {
          newTask = {
            name: currPerson.name,
            recordingdate: currPerson.recordingdate,
            type: "clipscreate",
            row: currPerson.row,
          };
          if (!taskAlreadyExist(newTask)) {
            console.log("new task!");
            console.log(newTask);
            allTasks.push(newTask);
          }
        }
        if (tasks4person.clipssendstatus === "active") {
          newTask = {
            name: currPerson.name,
            recordingdate: currPerson.recordingdate,
            type: "clipssend",
            row: currPerson.row,
          };
          if (!taskAlreadyExist(newTask)) {
            console.log("new task!");
            console.log(newTask);
            allTasks.push(newTask);
          }
        }
      });
      
      if (allTasks.length > 0) {
        createTasks();
      }
      console.log(size);
      optionList = document.createElement("dt");
      optionList.id = "label";
      
      if(allTasks.length===0){
        optionList.innerHTML = "אין הקלטות חדשות";
      }
      list.append(optionList);
    });
}

function createTasks() {
  for (var i = 0; i < allTasks.length; i++) {
    var tasksPerson = getPersonFromRow(allTasks[i].row);
    day = tasksPerson.recordingdate.getDate();
    month = tasksPerson.recordingdate.getMonth() + 1;
    recDate = day + "." + month;
    if (allTasks[i].type === "clipscreate") {
      ////////8
      optionDiv = document.createElement("div");
      optionDiv.classList.add("d-inline-flex");
      optionDiv.classList.add("flex-row");
      optionInput = document.createElement("input");
    optionBut=document.createElement("button");
        optionBut.innerHTML="להעתיק לינק";
        optionBut.classList.add("btn");
        //optionBut.classList.add("form-control");
        optionBut.classList.add("btn-light");
         optionBut.id = tasksPerson.link+"Copy"+allTasks[i].row;;
        optionBut.addEventListener("click", function () {
        copy(this);
      });
      optionInput.id = allTasks[i].row + "Checkclipscreate";
      optionInput.type = "checkbox";
      optionInput.classList.add("form-check-input");
        
      optionInput.addEventListener("click", function () {
        check(this);
      });
      optionDiv.append(optionInput);
      optionList = document.createElement("label");
      optionList.id = "clipscreate" + allTasks[i].row;
      optionList.innerHTML ="ליצור קליפים ל"+allTasks[i].name + " - " + recDate +" - "+tasksPerson.link+" - ";
      optionInput.classList.add("form-check-label");
      optionDiv.append(optionList);
        optionDiv.append(optionBut);
      list.append(optionDiv);
      list.append(document.createElement("br"));
      size++;
    }
    if (allTasks[i].type === "clipssend") {
      ////////9
      optionDiv = document.createElement("div");
      optionDiv.classList.add("d-inline-flex");
      optionDiv.classList.add("flex-row");
      optionInput = document.createElement("input");
      optionInput.id = allTasks[i].row + "Checkclipssend";
      optionInput.type = "checkbox";
      optionInput.classList.add("form-check-input");
      optionInput.addEventListener("click", function () {
        check(this);
      });
      optionDiv.append(optionInput);
      optionList = document.createElement("label");
      optionList.id = "clipssend" + allTasks[i].row;
      optionList.innerHTML ="לשלוח קליפים ל"+allTasks[i].name + " - " + recDate;
      optionInput.classList.add("form-check-label");
      optionDiv.append(optionList);
      list.append(optionDiv);
      list.append(document.createElement("br"));
      size++;
    }
  }
}
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}, 2050);
function taskAlreadyExist(task) {
   
  for (var i = 0; i < allTasks.length; i++) {
    if (allTasks[i].row === task.row && allTasks[i].type === task.type)
      return true;
  }
  return false;
}
function copy(ele){
    var splitId = ele.id.split("Copy");
  var text = splitId[0];
     var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  document.getElementById(ele.id).innerHTML="הועתק";
    
}
function check(ele) {
  var splitId = ele.id.split("Check");
  var type = splitId[1];
  var row = splitId[0];
  console.log(ele.id);
  if (document.getElementById(row + "Check" + type).checked) {
    changeStatus(row, type, "remove");
    document.getElementById(type + "" + row).style.textDecoration =
      "line-through";
    console.log("type:" + type + " row:" + row + " checked");
  } else {
    changeStatus(row, type, "add");
    document.getElementById(type + "" + row).style.textDecoration = "none";
    console.log("type:" + type + " row:" + row + " unchecked");
  }
}
function changeStatus(row, type, action) {
  var updatedStatus;
  if (row === 0) {
    alert("נא לבחור מישהו מהטבלה כדי לשנות");
  }
  if (action === "add") {
    updatedStatus = "active";
  }
  if (action === "remove") {
    updatedStatus = "completed";
  }
  send2sendData(row, type, updatedStatus);
  return updatedStatus;
}
function send2sendData(row, type, updatedStatus) {
  const temp = {
    text: updatedStatus,
    row: row,
    col: type,
  };
  if (row > 0) {
    sendData(temp);
  }
}
function sendData(obj) {
  console.log(obj);
  let formData = new FormData();
  formData.append("data", JSON.stringify(obj));
  console.log(obj);
  fetch(taskurl, {
    method: "POST",
    body: formData,
  })
    .then((rep) => {
      console.log(obj);
      return rep.json();
    })
    .then((json) => {
      console.log(obj);
      console.log(json);
    });
}
function getPersonFromRow(row) {
  for (var i = 0; i < allPeople.length; i++) {
    if (row === allPeople[i].row) {
      return allPeople[i];
    }
  }
  return;
}
function clipsCreateDate(date) {
  var next = new Date(date.getTime());
  next.setDate(date.getDate() + 2);
  next.setHours(0, 0, 0);
  return next;
}
function clipsSendDate(date) {
  var next = new Date(date.getTime());
  next.setDate(date.getDate() + 7);
  if (next.getDay() === 6) {
    next.setDate(date.getDate() + 8);
  }
  next.setHours(0, 0, 0);
  return next;
}
