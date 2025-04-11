function generateStudentTable(containerId, students) {
    const container = document.querySelector(containerId);
    const table = document.createElement("table");
  
    const columns = 5;
  
    for (let i = 0; i < students.length; i += columns) {
      const row = document.createElement("tr");
  
      for (let j = 0; j < columns; j++) {
        const cell = document.createElement("td");
        const student = students[i + j];
  
        if (student && student.trim().includes(" ")) {
          cell.textContent = student;
        } else {
          cell.innerHTML = "—————————";
        }
  
        row.appendChild(cell);
      }
  
      table.appendChild(row);
    }
  
    container.appendChild(table);
  }
  
  function generateActionTable(containerId, actions) {
    const container = document.querySelector(containerId);
    const table = document.createElement("table");
  
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["L.p.", "Opis działania", "Data", "Link"];
    headers.forEach(headerText => {
      const headerCell = document.createElement("th");
      headerCell.textContent = headerText;
      headerRow.appendChild(headerCell);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    const tbody = document.createElement("tbody");
    actions.forEach((action, index) => {
      const row = document.createElement("tr");
  
      const lpCell = document.createElement("td");
      lpCell.textContent = index + 1;
      row.appendChild(lpCell);
  
      const descriptionCell = document.createElement("td");
      descriptionCell.textContent = action.description;
      row.appendChild(descriptionCell);
  
      const dateCell = document.createElement("td");
      dateCell.textContent = action.date || "Brak daty";
      row.appendChild(dateCell);
  
      const linkCell = document.createElement("td");
      if (action.link) {
        const link = document.createElement("a");
        link.href = action.link;
        link.textContent = "Zobacz więcej";
        link.target = "_blank";
        linkCell.appendChild(link);
      } else {
        linkCell.textContent = "Brak linku";
      }
      row.appendChild(linkCell);
  
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
  
    container.appendChild(table);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const students = [
      "Jakub Kubiak", "Szymon Skrzypek", "Mateusz Czernecki", "Konrad Zadworny",
      "Patryk Stateczny", "Piotr Brożek", "Wojciech Hajduk", "Hubert Lech",
      "Mateusz Muszyński", "Jakub Przybyłowski", "Mateusz Skutnik", "Artur Snela",
      "Adam Solipiwko", "Patryk Suchożerbski", "Filip Świątek", "Kamil Zenderowski",
      "Jakub Budny", "Kamil Catka", "Piotr Knaż", "Jakub Półchłopek",
      "Jakub Przyciasa", "Martyna Ślizankiewicz", "Dawid Ślusarczyk", "Oliwia Smalcuga",
      "Stanisław Solarz", "Alan Szymczyk", "Jan Walicki"
    ];
  
    const actions = [
      { description: "Spotkanie informacyjne dla klas IV, rozpoczęcie rekrutacji", date: "", link: "" },
      { description: "II etap rekrutacji – test z języka angielskiego", date: "", link: "" },
      { description: "Ogłoszenie wyników rekrutacji", date: "", link: "" },
      { description: "Spotkanie online z firmą przyjmującą z Alicante – przygotowanie kulturowe", date: "", link: "" },
      { description: "Wizyta przygotowawcza", date: "07.04.2025", link: "" }
    ];
  
    generateStudentTable("#students-table", students);
    generateActionTable("#progress-table", actions);
  });