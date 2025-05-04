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
    link.style.color = "#333";
    link.target = "_blank";
    cell.appendChild(link);
  } else {
    cell.textContent = content || "Brak danych";
  }
  return cell;
}

function generateTable(containerId, data, columns = 3) {
  const container = document.querySelector(containerId);
  const table = containerId.includes("progress") ? container.querySelector("tbody") : document.createElement("table");

  if (!containerId.includes("progress")) {
    let isFirstRow = true;

    for (let i = 0; i < data.length; ) {
      const row = document.createElement("tr");

      if (isFirstRow) {
        const person1 = data[i];
        const person2 = data[i + 1];

        if (person1 && person2) {
          const content1 = person1.isStudent
            ? `${person1.name} ${person1.surname}`
            : person1.surname === "Panuszewska"
            ? `${person1.name} ${person1.surname} (Koordynator Projektu)`
            : `${person1.name} ${person1.surname} (Opiekun)`;

          const content2 = person2.isStudent
            ? `${person2.name} ${person2.surname}`
            : person2.surname === "Załucki"
            ? `${person2.name} ${person2.surname} (Opiekun)`
            : `${person2.name} ${person2.surname} (Opiekun)`;

          const cell = createCell(`${content1} |  ${content2}`);
          cell.colSpan = columns; 
          row.appendChild(cell);
          i += 2;
        }

        isFirstRow = false;
      } else {
        for (let j = 0; j < columns; j++) {
          const person = data[i];
          if (person) {
            const content = person.isStudent
              ? `${person.name} ${person.surname}`
              : person.surname === "Panuszewska"
              ? `${person.name} ${person.surname} (Koordynator Projektu)`
              : person.surname === "Załucki"
              ? `${person.name} ${person.surname} (Opiekun)`
              : `${person.name} ${person.surname} (Opiekun)`;
            row.appendChild(createCell(content));
            i++;
          } else {
            row.appendChild(createCell("—————————"));
          }
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
      const students = await fetchData('src/students.json');
      console.log('Students data:', students); 
      generateTable("#students-table", students, 3);
    }

    const progressTableContainer = document.querySelector("#progress-table tbody");
    if (progressTableContainer) {
      const actions = await fetchData('src/actions.json');
      console.log('Actions data:', actions);
      generateTable("#progress-table", actions);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
});