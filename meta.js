var allPeople = [];
var rowCount = 2;
var size = 0;
const url =
  "https://script.google.com/macros/s/AKfycbzXoN1d21aGDuS7dUEj9vz6v952hwbKmueQaPdJ20QbrDkH9X6485Vh2IxnYgTbVBR7kA/exec";
var newPerson = {};
var currPerson = [[],[],[],[]];
var messes = [
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: [] },
  { name: "", lines: []}];
var fullTexts = [[], [], [], []];
var allIds=[];
var allIdsWithClips=[];
var allIdsWithFull=[];
var crewDataURL =
  "https://script.google.com/macros/s/AKfycbz7IgSM1Rhei0PPSgEHwxD_YHtyevYhZt32Mje9asUeGE20_J8a59XYw0xNFJMxjDKXKA/exec";
getData();
document.getElementById("meta").style.visibility = "hidden";

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
          if(newPerson.id!==""&&newPerson.meta!=="v"){
            allPeople.push(newPerson);
            console.log(allPeople[size]);
              allIds.push(newPerson.id);
              if(newPerson.clip1!==""||newPerson.clip2!==""){
                  allIdsWithClips.push(newPerson.id);
              }
              if(newPerson.linkfull!==""){
                  allIdsWithFull.push(newPerson.id);
              }
              size++;
          }
          rowCount++;
      });
        
      console.log("ids:"+allIds.length+" idswclips:"+allIdsWithClips.length+" idswfull:"+allIdsWithFull.length);
      if(allIds.length<4||allIdsWithClips.length<4||allIdsWithFull.length<4){
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
          if (newMess.name===("פוסט 4")) {
            messes[1] = newMess;
              
          }
        if (newMess.name===("פוסט 8 (הודעה משתנה 2)")) {
            messes[2] = newMess;
          }
          if (newMess.name===("משלוח קליפים 3")) {
            messes[0] = newMess;
          }
          if (newMess.name===("משלוח קליפים 8")) {
            messes[3] = newMess;
          }
      });
      console.log(messes);
        for (var i = 0; i <= 3; i++) {
            for (var j = 0; j < messes[i].lines.length; j++) {
                cutMess(messes[i].lines, i + 1,i);
            }
      }
      
    });
  
}
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}, 5050);
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
    for(var i=1;i<=4;i++){
        document.getElementById(i+"Copy").innerHTML="העתקת פוסט";
    }
document.getElementById("meta").style.visibility = "hidden";
    var num1=allIdsWithClips[Math.floor(Math.random()*allIdsWithClips.length)];
    var num2=allIdsWithFull[Math.floor(Math.random()*allIdsWithFull.length)];
    while(num1===num2){
        num2=allIdsWithFull[Math.floor(Math.random()*allIdsWithFull.length)];
    }
    var num3=allIds[Math.floor(Math.random()*allIds.length)];
    while(num3===num1||num3===num2){
        num3=allIds[Math.floor(Math.random()*allIds.length)];
    }
    var num4=allIdsWithClips[Math.floor(Math.random()*allIdsWithClips.length)];
    while(num4===num3||num4===num2||num4===num1){
        num4=allIdsWithClips[Math.floor(Math.random()*allIdsWithClips.length)]
    }
    var pickedIds=[num1,num2,num3,num4];
    console.log(pickedIds);
    getMessData();
   // document.getElementById("allNamesB4").innerHTML="נבחרו: ";
  for (var i = 0; i < allPeople.length; i++) {
      for(var j=0;j<=3;j++){
            if (allPeople[i].id === pickedIds[j]) {
                 const temp = {
                     text: "v",
                     row: allPeople[i].row,
                     col: "meta",
                 };
                sendData(temp, document.getElementById("meta")); 
            document.getElementById("meta").style.visibility = "visible";
              currPerson[j] = allPeople[i];
                console.log(currPerson);
               // document.getElementById("allNamesB4").innerHTML+=allPeople[i].name+", ";
                document.getElementById("name"+(j+1)+"B4").innerHTML = allPeople[i].name+" - שרשרת "+fixChainFromData(allPeople[i].chain);
            }
      }
  }
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
function copy(id) {
  var text = fullTexts[id - 1];
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  document.getElementById(id+"Copy").innerHTML="הועתק";
}
