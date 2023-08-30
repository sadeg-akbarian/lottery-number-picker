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
  localStorage.setItem("numberCollection", JSON.stringify([]));
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function renderNumbers() {
  numberArea.innerHTML = "";
  const storedNumberCollection = JSON.parse(
    localStorage.getItem("numberCollection")
  );
  if (storedNumberCollection.length === 6) {
    pickButton.disabled = "true";
    resetButton.removeAttribute("disabled");
  }
  const cloneNumbers = structuredClone(storedNumberCollection);
  cloneNumbers.forEach((element) => {
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

renderNumbers();

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function updateNumbers() {
  const storedNumberCollection = JSON.parse(
    localStorage.getItem("numberCollection")
  );
  let randomNum;
  function findNumber() {
    randomNum = Math.floor(Math.random() * 49) + 1;
    if (storedNumberCollection.includes(randomNum)) {
      findNumber();
    }
  }
  findNumber();
  storedNumberCollection.push(randomNum);
  const sortedCollection = storedNumberCollection.sort(function (a, b) {
    return a - b;
  });
  localStorage.setItem("numberCollection", JSON.stringify(sortedCollection));
}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

pickButton.addEventListener("click", function () {
  updateNumbers();
  renderNumbers();
});

resetButton.addEventListener("click", function () {
  initialState();
  renderNumbers();
});
