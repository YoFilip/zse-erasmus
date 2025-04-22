async function fetchData(file) {
  console.log(`Fetching data from: ${file}`); 
  const response = await fetch(file);
  if (!response.ok) {
    console.error(`Failed to fetch ${file}:`, response.statusText); 
    throw new Error(`Failed to load ${file} data`);
  }
  const data = await response.json();
  return data;
}

function createCell(content, isLink = false) {
  const cell = document.createElement("td");
  if (isLink && content) {
    const link = document.createElement("a");
    link.href = content;
    link.textContent = "Zobacz więcej";
    link.target = "_blank";
    cell.appendChild(link);
  } else {
    cell.textContent = content || "Brak danych";
  }
  return cell;
}

function generateTable(containerId, data, columns = 5) {
  const container = document.querySelector(containerId);
  const table = containerId.includes("progress") ? container.querySelector("tbody") : document.createElement("table");

  if (!containerId.includes("progress")) {
    for (let i = 0; i < data.length; i += columns) {
      const row = document.createElement("tr");

      for (let j = 0; j < columns; j++) {
        const person = data[i + j];
        if (person) {
          const content = person.isStudent
            ? `${person.name} ${person.surname}`
            : `${person.name} ${person.surname}`;
          row.appendChild(createCell(content));
        } else {
          row.appendChild(createCell("—————————"));
        }
      }

      table.appendChild(row);
    }
    container.appendChild(table);
  } else {
    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.appendChild(createCell(index + 1));
      row.appendChild(createCell(item.description));
      row.appendChild(createCell(item.date));
      row.appendChild(createCell(item.link, true));
      table.appendChild(row);
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const studentsTableContainer = document.querySelector("#students-table");
    if (studentsTableContainer) {
      const students = await fetchData('./students.json');
      console.log('Students data:', students); 
      generateTable("#students-table", students, 5);
    }

    const progressTableContainer = document.querySelector("#progress-table tbody");
    if (progressTableContainer) {
      const actions = await fetchData('actions.json');
      console.log('Actions data:', actions);
      generateTable("#progress-table", actions);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
});