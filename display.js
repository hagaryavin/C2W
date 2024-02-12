var options = document.getElementById("people");
var personOption;
var allPeople = [];
var rowCount = 2;
var currPerson = {};
var size = 0;
const url =
  "https://script.google.com/macros/s/AKfycbw_2VmXLs1pJKLZElcT2Tp0tR6tPVRf4UWKfS22_n-F_DSEI2dF2zrsQrQ6If6P4mEaGg/exec";
getData();
function getData() {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.data.forEach((ele) => {
        newPerson = {
          name: ele.name,
          phone: ele.phone,
          row: rowCount,
          chain: ele.chain,
          link555: ele.linkfive,
          link55yt: ele.linkshortyt,
          linkfull: ele.linkfull,
          email: ele.email,
          order: ele.order,
          clip1: ele.clip1,
          clip2: ele.clip2,
        };
        if (ele.fixedname !== "") newPerson.name = ele.fixedname;
        if (ele.fixedphone !== "") newPerson.phone = ele.fixedphone;
        if (newPerson.chain === "") {
          if (ele.chaintwo !== "") newPerson.chain = ele.chaintwo;
          if (ele.chainthree !== "") newPerson.chain = ele.chainthree;
        }
        if (ele.fixedchain !== "") newPerson.chain = ele.fixedchain;
        if (ele.fixedemail !== "") newPerson.email = ele.fixedemail;
        allPeople.push(newPerson);
        console.log(allPeople[size]);
        personOption = document.createElement("option");
        personOption.value =
          newPerson.name + " + " + fixChainFromData(newPerson.chain);
        personOption.id = rowCount;
        if (newPerson.name !== "" || newPerson.chain !== "") {
          options.append(personOption);
        }
        rowCount++;
        size++;
      });
    });
}
function submitData() {
  document.getElementById("displaying").style.visibility = "hidden";
  for (var i = 0; i < allPeople.length; i++) {
    var nameAndChain = document.getElementById("peopleList").value.split(" + ");
    if (
      allPeople[i].name === nameAndChain[0] &&
      fixChainFromData(allPeople[i].chain) === nameAndChain[1]
    ) {
      document.getElementById("displaying").style.visibility = "visible";
      console.log("row num:" + allPeople[i].row);
      currPerson = allPeople[i];
      document.getElementById("nameDisplay").innerHTML =
        "שם מלא: " + allPeople[i].name;
      document.getElementById("chainDisplay").innerHTML =
        "שם השרשרת: " + allPeople[i].chain;
      document.getElementById("phoneDisplay").innerHTML =
        "נייד: " + allPeople[i].phone;
      document.getElementById("emailDisplay").innerHTML =
        "מייל: " + allPeople[i].email;
      document.getElementById("orderDisplay").innerHTML =
        "מס' חרוז: " + allPeople[i].order;
      document.getElementById("clip1Display").innerHTML =
        "קליפ1: " + allPeople[i].clip1;
      document.getElementById("clip2Display").innerHTML =
        "קליפ2: " + allPeople[i].clip2;
      document.getElementById("555Display").innerHTML =
        "סרט5:55: " + allPeople[i].link555;
      document.getElementById("55Display").innerHTML =
        "סרט55: " + allPeople[i].link55yt;
      document.getElementById("fullDisplay").innerHTML =
        "הראיון: " + allPeople[i].linkfull;
    }
  }
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
setTimeout(() => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}, 2050);
function reset() {
  document.location.reload();
}
function copy() {
  var text = "";
  if (document.getElementById("detail").value === "name") {
    text = currPerson.name;
  }
  if (document.getElementById("detail").value === "chain") {
    text = currPerson.chain;
  }
  if (document.getElementById("detail").value === "order") {
    text = currPerson.order;
  }
  if (document.getElementById("detail").value === "phone") {
    text = currPerson.phone;
  }
  if (document.getElementById("detail").value === "email") {
    text = currPerson.email;
  }
  if (document.getElementById("detail").value === "link555") {
    text = currPerson.link555;
  }
  if (document.getElementById("detail").value === "link55yt") {
    text = currPerson.link55yt;
  }
  if (document.getElementById("detail").value === "linkfull") {
    text = currPerson.linkfull;
  }
  if (document.getElementById("detail").value === "clip1") {
    text = currPerson.clip1;
  }
  if (document.getElementById("detail").value === "clip2") {
    text = currPerson.clip2;
  }
  var elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  alert("הטקסט הועתק!");
}
