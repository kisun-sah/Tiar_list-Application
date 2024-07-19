let currentDraggedItem;

const tierInput = document.getElementById("tier");
const itemContainers = document.getElementsByClassName("item-container");
const submitBtn = document.getElementById("submit");
const imageForm = document.getElementById("image-form");

for (const itemContainer of itemContainers) {
  setUpItemContainerForDrag(itemContainer);
}

//add eventlistener for image section 
imageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const imageItemInput = document.getElementById("image-item");
  if (imageItemInput.value === "") {
    alert("Please enter a valid image URL");
    return;
  }
  const imageUrl = imageItemInput.value;
  createTierListItem(imageUrl);
  imageItemInput.value = "";
});

// add eventlistener function for click button event fire.
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (tierInput.value === "") {
    alert("Please enter a tier name");
    return;
  }
  createTierList(tierInput.value);
  tierInput.value = "";
});

console.log("Script.js initializing");

// thise function generate brand new color for every tierlist heading .
function getRandomColor() {
  let val1 = Math.ceil(Math.random() * 255);
  let val2 = Math.ceil(Math.random() * 255);
  let val3 = Math.ceil(Math.random() * 255);
  return `rgb(${val1}, ${val2}, ${val3})`;
}

// create brand new  tirelist  
function createTierList(tierListName) {
  const newTierList = document.createElement("div");
  newTierList.classList.add("tier-list");

  const heading = document.createElement("div");
  heading.classList.add("heading");
  heading.style.backgroundColor = getRandomColor(); // Set random background color

  const textContainer = document.createElement("div");
  textContainer.textContent = tierListName;

  heading.appendChild(textContainer);

  const newTierListItems = document.createElement("div");
  newTierListItems.classList.add("tier-list-items");

  newTierList.appendChild(heading);
  newTierList.appendChild(newTierListItems);

  setUpDropZoneInTierListItem(newTierListItems);

  const tierSection = document.getElementById("tier-list-section");
  tierSection.appendChild(newTierList);
}

// create bramd new image section

function createTierListItem(imageUrl) {
  const imageDiv = document.createElement("div");
  imageDiv.setAttribute("draggable", "true");
  imageDiv.classList.add("item-container");

  setUpItemContainerForDrag(imageDiv);

  const img = document.createElement("img");
  img.src = imageUrl;

  imageDiv.appendChild(img);

  const nonTierSection = document.getElementById("non-tier-section");
  nonTierSection.appendChild(imageDiv);
}

// Dragstart function thise function allow tou to grag and drop the image
function setUpItemContainerForDrag(itemContainer) {
  itemContainer.addEventListener("dragstart", (event) => {
    console.log(event);
    currentDraggedItem = event.target.parentNode;
  });

  itemContainer.addEventListener("dblclick", (event) => {
    const parentNode = event.target.parentNode;
    const nonTierSection = document.getElementById("non-tier-section");
    nonTierSection.appendChild(parentNode);
  });
}

function setUpDropZoneInTierListItem(tierListItem) {
  tierListItem.addEventListener("drop", (event) => {
    event.preventDefault();
  });

  tierListItem.addEventListener("dragover", function (event) {
    console.log("event coming up", event);
    if (this !== currentDraggedItem.parentNode) {
      this.appendChild(currentDraggedItem);
    }
  });
}
