// Utility functions
function getRandomInt() {
  return Math.floor(Math.random() * 1001);
}

function getElementImageUrl(element) {
  return element != "" || element != null
    ? `https://swarfarm.com/static/herders/images/elements/${element.toLowerCase()}.png`
    : "";
}

function generateStarsHtml(starCount) {
  let starsHtml = "";
  for (let i = 0; i < starCount; i++) {
    starsHtml += `<img src="https://swarfarm.com/static/herders/images/stars/star-unawakened.png" alt="Star" width="15" height="15"> `;
  }
  return starsHtml;
}

function showPopup(url) {
  const popup = document.getElementById("popup");
  const popupImage = document.getElementById("popup-image");
  popupImage.src = url;
  popup.style.display = "flex";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}

// Summon functions
function performNormalSummon() {
  const random = getRandomInt();
  const stars = normalRechner(random);
  return getUnitByStars(stars);
}

function performLDSummon() {
  const random = getRandomInt();
  const stars = ldRechner(random);
  return getUnitByStars(stars, true);
}

function normalRechner(random) {
  if (random <= 5) {
    return 5;
  } else if (random <= 80) {
    return 4;
  } else {
    return 3;
  }
}

function ldRechner(random) {
  if (random <= 3) {
    return 5;
  } else if (random <= 60) {
    return 4;
  } else {
    return 3;
  }
}

function getUnitByStars(stars) {
  if (stars === 3) {
    return nat3[Math.floor(Math.random() * nat3.length)];
  } else if (stars === 4) {
    return nat4[Math.floor(Math.random() * nat4.length)];
  } else if (stars === 5) {
    return nat5[Math.floor(Math.random() * nat5.length)];
  }
}

function updateUnitList(unit) {
  const key = `${unit.name.toLowerCase()}-${unit.element.toLowerCase()}`;

  const existingUnit = unitList.find(
    (u) => `${u.name.toLowerCase()}-${u.element.toLowerCase()}` === key
  );

  if (existingUnit) {
    existingUnit.count++;
  } else {
    unitList.push({
      name: unit.name,
      element: unit.element,
      natural_stars: unit.natural_stars,
      count: 1,
    });
  }
}

function quadRoll() {
  let attempts = 0;
  let quadRoll = 0;

  while (quadRoll < 5) {
    attempts++;
    const chance = Math.random();
    if (chance <= 0.25) {
      const roll = Math.floor(Math.random() * 3) + 4; // Roll a die with values from 4 to 6
      if (roll === 6) {
        quadRoll++;
      } else {
        quadRoll = 0;
      }
    } else {
      quadRoll = 0;
    }
  }

  return attempts;
}

// Weitere Hilfsfunktionen hier...
