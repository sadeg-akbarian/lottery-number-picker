const pickButton = document.querySelector("#pickButton");
const resetButton = document.querySelector("#resetButton");
const numberArea = document.querySelector("main");

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const updateState = {
  contentLocalStorage: null,
  isPickButtonDisabled: null,
  isResetButtonDisabled: null,
  theInnerHTML: null,
};

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function initialState() {
  localStorage.clear();
  numberArea.innerHTML = "";
  pickButton.disabled = false;
  resetButton.setAttribute("disabled", "");
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function displayNumbers() {
  numberArea.innerHTML = "";
  let storedNumberCollection = JSON.parse(
    localStorage.getItem("numberCollection")
  );
  if (storedNumberCollection === null) {
    storedNumberCollection = [];
    localStorage.setItem(
      "numberCollection",
      JSON.stringify(storedNumberCollection)
    );
  }
  if (storedNumberCollection.length === 6) {
    pickButton.disabled = "true";
    resetButton.removeAttribute("disabled");
  }
  const cloneNumbers = structuredClone(storedNumberCollection);
  const sortedCollection = cloneNumbers.sort(function (a, b) {
    return a - b;
  });
  sortedCollection.forEach((element) => {
    const newParagraph = document.createElement("p");
    newParagraph.innerText = element;
    numberArea.appendChild(newParagraph);
  });
  updateState.contentLocalStorage = storedNumberCollection;
  updateState.isPickButtonDisabled = pickButton.disabled;
  updateState.isResetButtonDisabled = resetButton.disabled;
  updateState.theInnerHTML = numberArea.innerHTML;
  localStorage.setItem("updateState", JSON.stringify(updateState));
  console.log(localStorage.updateState);
}

displayNumbers();

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function pickNumbers() {
  const storedNumberCollection = JSON.parse(
    localStorage.getItem("numberCollection")
  );
  let randomNum = Math.floor(Math.random() * 49) + 1;
  if (storedNumberCollection.includes(randomNum) === true) {
    while (storedNumberCollection.includes(randomNum) === true) {
      let newNumber = Math.floor(Math.random() * 49) + 1;
      if (storedNumberCollection.includes(newNumber) === false) {
        randomNum = newNumber;
        break;
      }
    }
  }
  if (storedNumberCollection.length < 6) {
    storedNumberCollection.push(randomNum);
    localStorage.setItem(
      "numberCollection",
      JSON.stringify(storedNumberCollection)
    );
  }

  displayNumbers();
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

pickButton.addEventListener("click", pickNumbers);

resetButton.addEventListener("click", function () {
  initialState();
  displayNumbers();
});
