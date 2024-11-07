document.addEventListener("DOMContentLoaded", () => {
  // Event listeners for buttons
  document
    .getElementById("normal-summon-button")
    .addEventListener("click", () => {
      performFlexSummon("normal"); 
    });

  document.getElementById("ld-summon-button").addEventListener("click", () => {
    performFlexSummon("ld"); 
  });

  document
    .getElementById("display-inventory-button")
    .addEventListener("click", () => {
      displayInventory();
      if (
        document.getElementById("element-dropdown").style.display === "block"
      ) {
        document.getElementById("element-dropdown").style.display = "none";
        document.getElementById("unit-dropdown").style.display = "none";
        document.getElementById("start-summon").style.display = "none";
      }
    });

  document
    .getElementById("reset-inventory-button")
    .addEventListener("click", () => {
      resetInventory();
      
      
    });

  document
    .getElementById("pull-specific-unit-button")
    .addEventListener("click", () => {
      document.getElementById("element-dropdown").style.display = "block";
      document.getElementById("first-row").style.display = "none";
      document.getElementById("second-row").style.display = "none";
      const selectedElement = document.getElementById("element-select").value;
      populateUnitDropdown(selectedElement);
      document.getElementById("unit-dropdown").style.display = "block";
      document.getElementById("start-summon").style.display = "block";
      resetInventory();
    });

  document
    .getElementById("start-summon-button")
    .addEventListener("click", () => {
      const unitName = document.getElementById("unit-select").value;
      const element = document.getElementById("element-select").value;
      document.getElementById("first-row").style.display = "block";
      document.getElementById("second-row").style.display = "block";
      pullUntilUnitWithElement(unitName, element);
    });

  // Initialize inventory button
  updateInventoryButton();
});

function populateUnitDropdown(element) {
  const unitDropdown = document.getElementById("unit-select");
  unitDropdown.innerHTML = "";

  const filteredUnits = [...nat4, ...nat5]
    .filter((unit) => unit.element.toLowerCase() === element.toLowerCase())
    .sort((a, b) => {
      if (a.name === "Weapon Master") return -1;
      if (b.name === "Weapon Master") return 1;
      return a.name.localeCompare(b.name);
    }); // Sort units alphabetically with "Weapon Master" at the top

  filteredUnits.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.name;
    option.text = unit.name;
    unitDropdown.appendChild(option);
  });
}
