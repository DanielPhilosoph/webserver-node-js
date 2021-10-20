document.querySelector("#checkButton").addEventListener("click", onButtonClick);

async function onButtonClick(event) {
  event.preventDefault();
  let name = document.querySelector("#name").value;
  let age = document.querySelector("#age").value;
  let abilities = document.querySelector("#abilities").value;
  await handleClick(name, age, abilities);
}

async function handleClick(name, age, abilities) {
  try {
    const response = await axios.put(
      "http://localhost:3000",
      {
        name: name,
        age: age,
        abilities: abilities,
      },
      {
        Headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    );
    console.log(response.data);
    if (response.data == false) {
      window.open("./failed.html");
    } else {
      window.open("./success.html");
    }
  } catch (error) {
    console.log(error);
  }
}
