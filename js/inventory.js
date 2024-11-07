let totalInventoryCount = 0;

// Inventory functions
function updateInventory(unit) {
  const key = `${unit.name}-${unit.element}`;
  const existingUnit = inventory.find((u) => `${u.name}-${u.element}` === key);
  if (existingUnit) {
    existingUnit.count++;
  } else {
    inventory.push({
      name: unit.name,
      element: unit.element,
      natural_star: unit.natural_stars,
      count: 1,
      image_filename: unit.image_filename,
    });
  }
  updateInventoryButton();
}

function updateInventoryButton() {
  let totalUnits = 0;

  inventory.forEach((unit) => {
    totalUnits += unit.count;
  });

  const displayInventoryButton = document.getElementById(
    "display-inventory-button"
  );

  if (displayInventoryButton) {
    displayInventoryButton.innerHTML = `Inventar anzeigen (${totalUnits})`;
  }
}

function resetInventory() {
  inventory = [];
  updateInventoryButton();
  totalInventoryCount = 0;
  displayInventory();
}

function displayInventory() {
  const firstRow = document.getElementById("first-row");
  const secondRow = document.getElementById("second-row");

  firstRow.innerHTML = "";
  secondRow.innerHTML = "";

  totalInventoryCount = inventory.reduce((acc, unit) => acc + unit.count, 0);

  const sortedEntries = inventory.sort((a, b) => {
    if (b.natural_star !== a.natural_star) {
      return b.natural_star - a.natural_star;
    }
    return a.name.localeCompare(b.name);
  });

  sortedEntries.forEach((entry, i) => {
    const targetList =
      i < Math.ceil(sortedEntries.length / 2) ? firstRow : secondRow;

    const elementImageUrl = getElementImageUrl(entry.element);
    const unitImageUrl = `https://swarfarm.com/static/herders/images/monsters/${entry.image_filename}`;
    const starsHtml = generateStarsHtml(entry.natural_star);

    const listItem = document.createElement("li");
    listItem.innerHTML = `
            ${starsHtml}
            <br>
            <img src="${elementImageUrl}" alt="${entry.element}" width="20" height="20"> 
             ${entry.name} (${entry.count} mal)
            <br>
            <img src="${unitImageUrl}" alt="${entry.name}" width="50" height="50">
        `;
    targetList.appendChild(listItem);
  });
}
