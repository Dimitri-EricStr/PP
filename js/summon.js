const ELEMENTS = {
  LIGHT: "light",
  DARK: "dark",
  FIRE: "fire",
  WATER: "water",
  WIND: "wind",
};

// Summon functions
function performSummon(type, counter = 10) {
  const unitList = [];
  let count = counter;

  for (let i = 0; i < count; ) {
    const unit = type === "ld" ? performLDSummon() : performNormalSummon();
    if (isValidUnit(unit, type)) {
      unitList.push(unit);
      updateInventory(unit); // wenn das raus ist für pulluntil geht es schneller
      updateUnitList(unit);
      i++; // Sicherstellen, dass die Zählung hier korrekt erhöht wird
    }
  }

  const frequencyMap = getFrequencyMap(unitList);
  const sortedUnitList = sortUnitList(Object.values(frequencyMap));
  updateDisplay(sortedUnitList);
}

async function pullUntilUnitWithElement(unitName, element) {
  let summonCount = 0;
  let unit;

  while (true) {
    summonCount++;

    // Bei der Suche nach einer Feuer-Einheit normale Summons verwenden
    if (element === "fire" || element === "water" || element === "wind") {
      unit = performNormalSummon(); // Normale Summon für Feuer, Wasser, Wind
    } else {
      unit = performLDSummon(); // L/D-Summon für Licht/Dunkel
    }

    // Wenn sowohl der Name als auch das Element der gezogenen Einheit übereinstimmen, Schleife beenden
    if (unit.name === unitName && unit.element.toLowerCase() === element) {
      updateInventory(unit); // Inventar aktualisieren
      totalInventoryCount++; // Gesamten Zähler erhöhen
      break; // Schleife beenden
    }

    // Alle Einheiten, die durch normale Summons gezogen werden (Feuer, Wasser, Wind), ins Inventar legen
    if (element === "fire" || element === "water" || element === "wind") {
      updateInventory(unit); // Alle Einheiten ins Inventar legen
      totalInventoryCount++; // Gesamten Zähler erhöhen
    } else if (
      unit.element.toLowerCase() === "light" ||
      unit.element.toLowerCase() === "dark"
    ) {
      // Für L/D-Summons: Nur Einheiten mit dem richtigen Element ins Inventar hinzufügen
      updateInventory(unit);
      totalInventoryCount++;
    }
  }

  //updateDisplay(unitList); // Zeige die endgültige Liste an
}

function isValidUnit(unit, type) {
  const validElements =
    type === "normal"
      ? [ELEMENTS.FIRE, ELEMENTS.WATER, ELEMENTS.WIND]
      : [ELEMENTS.LIGHT, ELEMENTS.DARK];
  return validElements.includes(unit.element);
}

// Utility functions
function getFrequencyMap(unitList) {
  return unitList.reduce((acc, unit) => {
    const key = `${unit.name.toLowerCase()}-${unit.element.toLowerCase()}`;
    if (!acc[key]) {
      acc[key] = { ...unit, count: 1 };
    } else {
      acc[key].count++;
    }
    return acc;
  }, {});
}

function sortUnitList(unitList) {
  return unitList.sort((a, b) => {
    if (b.natural_stars !== a.natural_stars)
      return b.natural_stars - a.natural_stars;
    if (a.element === ELEMENTS.LIGHT && b.element !== ELEMENTS.LIGHT) return -1;
    if (a.element === ELEMENTS.DARK && b.element !== ELEMENTS.DARK) return 1;
    if (b.count !== a.count) return b.count - a.count;
    return a.name.localeCompare(b.name);
  });
}

function updateDisplay(unitList) {
  const firstRow = document.getElementById("first-row");
  const secondRow = document.getElementById("second-row");
  firstRow.innerHTML = "";
  secondRow.innerHTML = "";

  unitList.forEach((unit, index) => {
    const targetList =
      index < Math.ceil(unitList.length / 2) ? firstRow : secondRow;
    const listItem = createListItem(unit);
    targetList.appendChild(listItem);
  });
}

function createListItem(unit) {
  const listItem = document.createElement("li");
  const elementImageUrl = getElementImageUrl(unit.element);
  const unitImageUrl = `https://swarfarm.com/static/herders/images/monsters/${unit.image_filename}`;
  const starsHtml = generateStarsHtml(unit.natural_stars);

  listItem.innerHTML = `
        <div style="text-align: center;">
            ${starsHtml}
            <br>
            <img src="${elementImageUrl}" alt="${unit.element}" width="20" height="20"> 
             ${unit.name} (${unit.count} mal)
            <br>
            <img src="${unitImageUrl}" alt="${unit.name}" width="50" height="50">
        </div>
    `;
  return listItem;
}

function perform100Summons() {
  performSummon("ld", 100);
}

// Weitere Funktionen für Normal- und LD-Beschwörung hier...
