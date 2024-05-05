var allPeople = [];
var reallyAllPeople = [];
var rowCount = 2;
var peopleOptions = document.getElementById("people0");
var personOption;
var size = 0;
const url =
  "https://script.google.com/macros/s/AKfycbzXoN1d21aGDuS7dUEj9vz6v952hwbKmueQaPdJ20QbrDkH9X6485Vh2IxnYgTbVBR7kA/exec";
var newPerson = {};
var currPerson = [[],[],[],[]];
var messes = [
    { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: []},
{ name: "", lines: []}];
var fullTexts = [[], [], [], [],[],[]];
var allRows=[];
var allRowsWithClips=[];
var allRowsWithFull=[];
var crewDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
getData();
const date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
document.getElementById("meta").style.visibility = "hidden";
var chosenRows=[];
function getData() {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        newPerson = {
          name: ele.name,
          chain: ele.chain,
        linkfull: ele.linkfull,
            link555:ele.linkfive,
            link55yt:ele.linkshortyt,
            title: ele.topicofstory,
            id:ele.id,
            clip1:ele.clip1,
            clip2:ele.clip2,
            meta:ele.meta,
             row: rowCount
            
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedtopicofstory !== "")
          newPerson.title = ele.fixedtopicofstory;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") {
            newPerson.chain = ele.chaintwo;
          }
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        personOption = document.createElement("option");
        personOption.value =
          newPerson.name + " + " + fixChainFromData(newPerson.chain);
        if (newPerson.name !== "" || newPerson.chain !== "") {
          peopleOptions.append(personOption);
        }
          reallyAllPeople.push(newPerson);
          if(newPerson.id!==""&&newPerson.meta===""){
            allPeople.push(newPerson);
            console.log(allPeople[size]);
              allRows.push(newPerson.row);
              if(newPerson.clip1!==""||newPerson.clip2!==""){
                  allRowsWithClips.push(newPerson.row);
              }
              if(newPerson.linkfull!==""){
                  allRowsWithFull.push(newPerson.row);
              }
              size++;
          }
          rowCount++;
      });
        
      console.log("ids:"+allRows.length+" idswclips:"+allRowsWithClips
                 .length+" idswfull:"+allRowsWithFull.length);
      if(allRows.length<4||allRowsWithClips
        .length<4||allRowsWithFull.length<4){
          clearList();
      }else{
        submitData();
      }
    });
}
function reset() {
  document.location.reload();
}
function getMessData() {
  var newMess;
  fetch(crewDataURL)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.messages.forEach((ele) => {
        newMess = {
          name: ele.name,
          lines: [
            ele.line1,
            ele.line2,
            ele.line3,
            ele.line4,
            ele.line5,
            ele.line6,
            ele.line7,
            ele.line8,
            ele.line9,
            ele.line10,
            ele.line11,
            ele.line12,
            ele.line13,
            ele.line14,
            ele.line15,
            ele.line16,
            ele.line17,
            ele.line18,
            ele.line19,
            ele.line20,
          ]
        };
        for (var i = 1; i <= 6; i++) {
          if (newMess.name.includes("מטא " + i)) {
            messes[i - 1] = newMess;
              console.log(newMess);
          }
        }
      });
      for (var i = 0; i <= 3; i++) {
        for (var j = 0; j < messes[i].lines.length; j++) {
          cutMess(messes[i].lines, i + 1,i);
        }
      }
      for (var i = 4; i <= 5; i++) {
        for (var j = 0; j < messes[i].lines.length; j++) {
          cutMessGen(messes[i].lines, i + 1);
        }
      }
    });
  console.log(fullTexts);
}
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}, 5050);
setTimeout(() => {
   const loader0 = document.getElementById("loader0");
  loader0.style.display = "none";
}, 2050);
    
function cutMess(linesArr, messType,personNum) {
  var currText = "";
  var testDiv = document.getElementById("text" + messType);
  removeAllChildNodes(testDiv);
  
  var i = 0;
  while (linesArr[i] !== "end") {
    if (linesArr[i].includes("firstNameOfGuest")) {
      linesArr[i] = linesArr[i].replace(
        "firstNameOfGuest",
        fixFirstName(currPerson[personNum].name)
      );
    }
    if (linesArr[i].includes("fullNameOfGuest")) {
      linesArr[i] = linesArr[i].replace("fullNameOfGuest", currPerson[personNum].name);
    }
    if (linesArr[i].includes("nameOfChain")) {
      linesArr[i] = linesArr[i].replace("nameOfChain", fixChainFromData(currPerson[personNum].chain));
    }
    if (linesArr[i].includes("title")) {
      linesArr[i] = linesArr[i].replace("title", currPerson[personNum].title);
    }
    if (linesArr[i].includes("fullLink")) {
      linesArr[i] = linesArr[i].replace("fullLink", currPerson[personNum].linkfull);
    }
    if (linesArr[i].includes("link555")) {
      linesArr[i] = linesArr[i].replace("link555", currPerson[personNum].link555);
    }
    if (linesArr[i].includes("link55youtube")) {
      linesArr[i] = linesArr[i].replace("link55youtube", currPerson[personNum].link55yt);
    }
    if (linesArr[i].includes("linkclip1")) {
      linesArr[i] = linesArr[i].replace("linkclip1", currPerson[personNum].clip1);
    }
    if (linesArr[i].includes("linkclip2")) {
      linesArr[i] = linesArr[i].replace("linkclip2", currPerson[personNum].clip2);
    }
    if (linesArr[i] !== "") {
      if (linesArr[i + 1] !== "end") {
        currText += linesArr[i] + "\n";
      }
      if (linesArr[i + 1] === "end") {
        currText += linesArr[i];
      }
    }
    if (linesArr[i] === "") {
      currText += "\n";
    }
    while (linesArr[i].includes("*")) {
            linesArr[i] = linesArr[i].replace("*", "");
    }

    var testH4 = document.createElement("h4");
    if (linesArr[i] !== "") {
      if (linesArr[i + 1] === "") {
        testH4.classList.add("mb-3");
      }
      if (linesArr[i + 1] !== "") {
        testH4.classList.add("mb-0");
      }
      testH4.innerHTML = linesArr[i];
      testDiv.append(testH4);
    }
    i++;
  }
  fullTexts[messType - 1] = currText;
}
function cutMessGen(linesArr, messType) {
  var currText = "";
  var testDiv = document.getElementById("text" + messType);
  removeAllChildNodes(testDiv);
  
  var i = 0;
  while (linesArr[i] !== "end") {
    
    if (linesArr[i] !== "") {
      if (linesArr[i + 1] !== "end") {
        currText += linesArr[i] + "\n";
      }
      if (linesArr[i + 1] === "end") {
        currText += linesArr[i];
      }
    }
    if (linesArr[i] === "") {
      currText += "\n";
    }
    while (linesArr[i].includes("*")) {
            linesArr[i] = linesArr[i].replace("*", "");
    }

    var testH4 = document.createElement("h4");
    if (linesArr[i] !== "") {
      if (linesArr[i + 1] === "") {
        testH4.classList.add("mb-3");
      }
      if (linesArr[i + 1] !== "") {
        testH4.classList.add("mb-0");
      }
      testH4.innerHTML = linesArr[i];
      testDiv.append(testH4);
    }
    i++;
  }
  fullTexts[messType - 1] = currText;
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function reset() {
  document.location.reload();
}
function fixChainFromData(chain) {
  var splittedChain; //
  if (chain.includes(" (") || chain.includes("-")) {
    splittedChain = chain.split(" (");
    var moresplitted;
    if (splittedChain[0].includes("-")) {
      moresplitted = splittedChain[0].split("-");
      return moresplitted[1].trim();
    }
    return splittedChain[0].trim();
  }
  return chain;
}
function submitData() {
    document.getElementById("quickChange").innerHTML="ניקוי שדה פרסום מטא והחזרת החרוז להגרלה";
    for(var i=1;i<=4;i++){
        document.getElementById(i+"Copy").innerHTML="העתקת פוסט";
    }
document.getElementById("meta").style.visibility = "hidden";
    var num1=allRowsWithClips
   [Math.floor(Math.random()*allRowsWithClips
               .length)];
    var num2=allRowsWithFull[Math.floor(Math.random()*allRowsWithFull.length)];
    while(num1===num2){
        num2=allRowsWithFull[Math.floor(Math.random()*allRowsWithFull.length)];
    }
    var num3=allRows[Math.floor(Math.random()*allRows.length)];
    while(num3===num1||num3===num2){
        num3=allRows[Math.floor(Math.random()*allRows.length)];
    }
    var num4=allRowsWithClips
   [Math.floor(Math.random()*allRowsWithClips
               .length)];
    while(num4===num3||num4===num2||num4===num1){
        num4=allRowsWithClips
       [Math.floor(Math.random()*allRowsWithClips
                   .length)]
    }
    var pickedRows=[num1,num2,num3,num4];
    console.log(pickedRows);
    chosenRows=pickedRows;
    
   // document.getElementById("allNamesB4").innerHTML="נבחרו: ";
  for (var i = 0; i < allPeople.length; i++) {
      for(var j=0;j<=3;j++){
            if (allPeople[i].row === pickedRows[j]) {
                 
            document.getElementById("meta").style.visibility = "visible";
              currPerson[j] = allPeople[i];
                console.log(currPerson);
               // document.getElementById("allNamesB4").innerHTML+=allPeople[i].name+", ";
                document.getElementById("name"+(j+1)+"B4").innerHTML = allPeople[i].name+" - שרשרת "+fixChainFromData(allPeople[i].chain);
            }
      }
  }
getMessData();
}
function fixFirstName(fullName) {
  if (!fullName.includes(" ")) return fullName;
  const splittedName = fullName.split(" ");
  if (
    splittedName[0] === 'ד"ר' ||
    splittedName[0] === "ד״ר" ||
    splittedName[0] === "דוקטור" ||
    splittedName[0] === "פרופסור" ||
    splittedName[0] === "פרופ'" ||
    splittedName[0] === "Dr."
  ) {
    return splittedName[1];
  }
  return splittedName[0];
}
function clearList(){

   for(var i=2;i<rowCount;i++){
       const temp = {
                 text: "",
                 row: i,
                 col: "meta",
             };
     sendData(temp, document.getElementById("meta"));
   }
    
}
function sendData(obj, ele) {
  console.log(obj);
  let formData = new FormData();
  formData.append("data", JSON.stringify(obj));
  console.log(obj);
  fetch(url, {
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
      ele.innerHTML = json.val;
    });
}
function quickChange() {
    var chosenPersonRow = 0;
     var nameAndChain = document.getElementById("peopleList0").value.split(" + ");
  for (var i = 0; i < reallyAllPeople.length; i++) {   
    if (
      reallyAllPeople[i].name === nameAndChain[0] &&
      fixChainFromData(reallyAllPeople[i].chain) === nameAndChain[1]
    ) {
      console.log(nameAndChain);
      chosenPersonRow = reallyAllPeople[i].row;
    }
  }
  if (chosenPersonRow === 0) {
    alert("נא לבחור חרוז");
  }

  if (chosenPersonRow > 0) {
    const temp = {
      text: "",
      row: chosenPersonRow,
      col: "meta",
    };
    sendData(temp, document.getElementById("quickChange"));
    document.getElementById("quickChange").innerHTML="התעדכן";
  }
}
function copy0(id) {
  var text = fullTexts[id - 1];
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  document.getElementById(id+"Copy").innerHTML="הועתק";
}
function copy(id) {
  var text = fullTexts[id - 1];
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
    const temp = {
                     text: (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear(),
                     row: chosenRows[id-1],
                     col: "meta",
                 };
                
    sendData(temp, document.getElementById("meta")); 
    
  document.getElementById(id+"Copy").innerHTML="הועתק";
}
