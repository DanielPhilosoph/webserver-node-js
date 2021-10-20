const http = require("http");
const PORT = 3000;
const validStudent = require("./db.js");

const server = http.createServer((req, res) => {
  let mainValid = false;
  res.writeHead(200, "ok", {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Content-Type": "text/plain",
  });

  req.on("data", (data) => {
    let dataJSON = JSON.parse(data.toString());
    if (ValidStudent(dataJSON)) {
      mainValid = true;
    }
    return;
  });

  req.on("end", () => {
    res.write(mainValid.toString());
    res.end();
  });
});

server.listen(PORT, (err) => {
  if (err) {
    throw `Error! ${err}`;
  } else {
    console.log("Server listen on port " + PORT);
  }
});

function ValidStudent(dataJSON) {
  let valid = true;
  let hasAbility = hasRequiredAbility(dataJSON.abilities);
  if (!isValidName(dataJSON.name)) {
    valid = false;
  } else if (!isAllowedAge(parseInt(dataJSON.age))) {
    valid = false;
  } else if (!hasAbility) {
    valid = false;
  }
  return valid;
}

function hasRequiredAbility(text) {
  let hasAbility = false;
  for (let ability of validStudent.ability) {
    if (text.toLowerCase().search(ability.toLowerCase()) !== -1) {
      hasAbility = true;
      break;
    }
  }
  return hasAbility;
}

function isValidName(inputName) {
  let invalidStudentName = validStudent.nameNotEqual.filter((name) => {
    return name.toLowerCase() === inputName.toLowerCase();
  });
  if (invalidStudentName.length > 0) {
    return false;
  } else {
    return true;
  }
}

function isAllowedAge(age) {
  if (validStudent.minAge > age || validStudent.maxAge < age) {
    return false;
  } else {
    return true;
  }
}
