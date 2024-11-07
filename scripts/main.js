//#region  national park functions
loadingTableData();
function loadingTableData() {
  const tableBody = document.querySelector("tbody");
  const headers = document.querySelectorAll("th");

  nationalParksArray.forEach((park) => {
    const row = document.createElement("tr");

    for (header of headers) {
      if (Object.hasOwn(park, header.id)) {
        const tableDataCell = document.createElement("td");
        let headerId = header.id;
        tableDataCell.textContent = park[headerId] 
        row.appendChild(tableDataCell);
      } else {
        const tableDataCell = document.createElement("td");
        let headerId = header.id;
        tableDataCell.textContent = "" 
        row.appendChild(tableDataCell);
      }
      tableBody.appendChild(row);
    }
  });
}

nationalPark_selectDropDown();
function nationalPark_selectDropDown() {
  const allRadios = document.querySelectorAll("input[type='radio']");
  allRadios.forEach((radio) => {
    radio.addEventListener("click", () => {
      resetDropdown();
      displayDropDown(
        populateDropDown(radio, selectedDropdown(radio), selectedArray(radio))
      );
    });
  });
}

function selectedDropdown(radio) {
  const selectedDropdown =
    radio.id === "location-radio" ? "location-DropDown" : "parkType-DropDown";
  return selectedDropdown;
}
function selectedArray(radio) {
  const selectedArray =
    radio.id === "location-radio" ? locationsArray : parkTypesArray;
  return selectedArray;
}
function populateDropDown(radioInput, dropDownID, array) {
  const dropDown = document.getElementById(dropDownID);
  //dropDown.length = 1;
  array.forEach((element) => {
    const option = document.createElement("option");
    option.textContent = element;
    dropDown.appendChild(option);
  });
  return { radioInput, dropDown };
}
function resetDropdown() {
  const allSelect = document.querySelectorAll("select");
  allSelect.forEach((select) => {
    select.classList.add("hide-display");
  });
}
function displayDropDown(obj) {
  radioInput = obj.radioInput;
  dropDown = obj.dropDown;
  const activeDropdown = radioInput.checked
    ? dropDown.classList.remove("hide-display")
    : dropDown.classList.add("hide-display");
  capturingInput(dropDown);
}

function capturingInput(dropDownElement) {
  dropDownElement.addEventListener("change", () => {
    const selectedOption = dropDownElement.value;
    createTableHeaders(eraseTableData());
    parsingArray(dropDownElement, selectedOption);
  });
}

function eraseTableData() {
  const tableBody = document.querySelector("tbody");
}

function createTableHeaders(obj) {
  const values = Object.values(obj);
  const tableHeader = document.querySelector("thead");
  tableHeader.textContent = "";

  values.forEach((value) => {
    const header = document.createElement("th");
    header.textContent = value;
    tableHeader.appendChild(header);
  });
  return values;
}

function parsingArray(dropDownElement, selectedOption) {
  eraseTableData();
  let tableHeadersArray = eraseTableData();
  if (dropDownElement.id === "location-DropDown") {
    nationalParksArray.forEach((state) => {
      if (selectedOption === state.State) {
        createTableData(tableHeadersArray, state);
      }
    });
  } else {
    nationalParksArray.forEach((park) => {
      if (park.LocationName.includes(selectedOption)) {
        createTableData(tableHeadersArray, park);
      }
    });
  }
}

//#endregion

//#region  mountain page

mountains_PopulateDropDown();
function mountains_PopulateDropDown() {
  const mountainDropDown = document.getElementById("mountainDropDown");
  mountainsArray.forEach((element) => {
    const option = document.createElement("option");
    option.textContent = element.name;
    mountainDropDown.appendChild(option);
  });
  mountainsDisplayDropDown(mountainDropDown);
}

function mountainsDisplayDropDown(dropDownElement) {
  dropDownElement.addEventListener("change", () => {
    if (dropDownElement.value != "Select One") {
      const mountainName = document.getElementById("mountainName");
      mountainName.textContent = dropDownElement.value;
      searchMountainImage(mountainName.textContent)
    } 
  });
}

function searchMountainImage(mountainName) {
  console.log(mountainName)
  mountainsArray.forEach((mountain) => {
    if (mountain.name === mountainName) {
      addMountainImage(mountain.img);
      addMountainattr(mountain);
      addDescription(mountain);
    }
  });
}
function addMountainImage(image) {
  let imageElement = document.getElementById("mountainImage");
  imageElement.src = `./images/${image}`;
  changeDisplay()
 
}

function changeDisplay(){
  const hideDisplayElements = document.querySelectorAll(".hideDisplay")
  hideDisplayElements.forEach(element => {
    element.classList.remove("hideDisplay")
  })
}
function addMountainattr(mountain) {
  const mountainInfo = document.getElementById("elevationInfo");
  mountainInfo.innerHTML = "Elevation: " + mountain.elevation + "&emsp;" +  "Effort: " + mountain.effort
}

function addDescription(mountain) {
  const description = document.getElementById("mountainDesc");
  description.textContent = mountain.desc;
}

//#endregion

// https://www.youtube.com/shorts/Y1_P-MPp3xI
