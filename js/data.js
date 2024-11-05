let nat3 = [];
let nat4 = [];
let nat5 = [];
let inventory = [];
let unitList = [];

// Data filtering functions
function filterEntriesByValidLetters(data) {
  const validArrayLetters = "abcdefghijklmnopqrstuvwxyz";

  return data.filter((entry) => {
    for (const char of entry.fields.name.toLowerCase()) {
      if (validArrayLetters.includes(char)) {
        return true;
      }
    }
    return false;
  });
}

async function loadAndFilterData(filePath) {
  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error("Netzwerkantwort war nicht ok");
    }

    let jsonData = await response.json();
    jsonData = filterEntriesByValidLetters(jsonData);
    const filteredData = jsonData.filter(
      (element) =>
        element.fields.natural_stars >= 3 && element.fields.natural_stars <= 5
    );

    nat3 = filteredData
      .filter(
        (element) =>
          element.fields.natural_stars === 3 &&
          !element.fields.is_awakened &&
          element.fields.obtainable === true
      )
      .map((element) => ({
        name: element.fields.name,
        element: element.fields.element,
        natural_stars: element.fields.natural_stars,
        image_filename: element.fields.image_filename,
      }));

    nat4 = filteredData
      .filter(
        (element) =>
          element.fields.natural_stars === 4 &&
          !element.fields.is_awakened &&
          element.fields.obtainable === true
      )
      .map((element) => ({
        name: element.fields.name,
        element: element.fields.element,
        natural_stars: element.fields.natural_stars,
        image_filename: element.fields.image_filename,
      }));

    nat5 = filteredData
      .filter(
        (element) =>
          element.fields.natural_stars === 5 &&
          !element.fields.is_awakened &&
          element.fields.obtainable === true &&
          element.fields.homunculus === false
      )
      .map((element) => ({
        name: element.fields.name,
        element: element.fields.element,
        natural_stars: element.fields.natural_stars,
        image_filename: element.fields.image_filename,
      }));
  } catch (err) {
    console.error("Fehler beim Laden oder Parsen der Datei:", err);
  }
}

// Load data
loadAndFilterData("bestiary_data.json");
