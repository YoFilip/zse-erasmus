async function fetchExpectations(file) {
    const response = await fetch(file);
    if (!response.ok) {
      console.error(`Failed to fetch ${file}:`, response.statusText);
      throw new Error(`Failed to load ${file} data`);
    }
    return await response.json();
  }
  
  function generateExpectationsTable(containerId, expectations) {
    const container = document.querySelector(containerId);
    const table = document.createElement("table");
  
    const columns = 3;
  
    for (let i = 0; i < expectations.length; i += columns) {
      const row = document.createElement("tr");
  
      for (let j = 0; j < columns; j++) {
        const cell = document.createElement("td");
        const expectation = expectations[i + j];
  
        if (expectation) {
          const text = document.createElement("p");
          text.textContent = expectation.text;
  
          const name = document.createElement("p");
          name.textContent = expectation.name;
          name.style.color = "#a9a9a9";
          name.style.fontWeight = "bold";
          name.style.marginTop = "10px";
  
          cell.appendChild(text);
          cell.appendChild(name);
        } else {
          cell.innerHTML = "—————————";
        }
  
        row.appendChild(cell);
      }
  
      table.appendChild(row);
    }
  
    container.appendChild(table);
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const expectations = await fetchExpectations('../../studentExpectations.json');
      generateExpectationsTable("#expectations-container", expectations);
    } catch (error) {
      console.error("Error loading expectations:", error);
    }
  });