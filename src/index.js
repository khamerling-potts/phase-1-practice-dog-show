let id;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#dog-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector(
      "#dog-form > input[type=text]:nth-child(1)"
    ).value;
    const breed = document.querySelector(
      "#dog-form > input[type=text]:nth-child(2)"
    ).value;
    const sex = document.querySelector(
      "#dog-form > input[type=text]:nth-child(3)"
    ).value;
    patchDog(id, name, breed, sex);
  });
  fetchDogs();
});

function fetchDogs() {
  const tbody = document.querySelector("#table-body");
  tbody.innerHTML = "";
  fetch(`http://localhost:3000/dogs`)
    .then((res) => res.json())
    .then((dogs) => dogs.forEach(displayDog));
}

function displayDog(dog) {
  const tbody = document.querySelector("#table-body");
  const row = document.createElement("tr");
  tbody.appendChild(row);
  const name = document.createElement("td");
  name.innerText = dog.name;
  const breed = document.createElement("td");
  breed.innerText = dog.breed;
  const sex = document.createElement("td");
  sex.innerText = dog.sex;
  const edit = document.createElement("td");
  edit.innerHTML = "<button>Edit</button>";
  edit.addEventListener("click", () => editDog(dog));
  row.append(name, breed, sex, edit);
}

//create event listener for each edit button
//callback function should take in dog as a parameter
//grab the input elements and set their values equal to the dog properties
//add submit event listener to form
//pass dog, nameinput, breedinput, and sexinput into the callback
//make patch fetch request, using the values in the input fields as the dog's property values
//after patch request, do a new get request for all dogs and re render them
function editDog(dog) {
  console.log("click");
  const form = document.querySelector("#dog-form");
  const inputs = form.querySelectorAll("input");
  [nameInput, breedInput, sexInput] = inputs;
  nameInput.value = dog.name;
  breedInput.value = dog.breed;
  sexInput.value = dog.sex;
  id = dog.id;
}

function patchDog(id, name, breed, sex) {
  console.log("submit");
  const configObj = {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      breed: breed,
      sex: sex,
    }),
  };
  console.log(id);
  fetch(`http://localhost:3000/dogs/${id}`, configObj)
    .then((res) => res.json())
    .then((data) => fetchDogs());
}
