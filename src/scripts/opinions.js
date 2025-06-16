async function fetchOpinions(file) {
  const response = await fetch(file);
  if (!response.ok) {
    console.error(`Failed to fetch ${file}:`, response.statusText);
    throw new Error(`Failed to load ${file} data`);
  }
  return await response.json();
}

function populateOpinions(opinions) {
  const wrapper = document.querySelector(".opinions-wrapper");

  wrapper.innerHTML = "";

  opinions.forEach((opinion) => {
    const opinionDiv = document.createElement("div");
    opinionDiv.classList.add("expectations");

    const nameElement = document.createElement("h3");
    nameElement.classList.add("expectations-name");
    nameElement.textContent = `${opinion.author}`;

    const quoteElement = document.createElement("blockquote");
    quoteElement.classList.add("expectations-quote");
    quoteElement.textContent = `"${opinion.text}"`;

    opinionDiv.appendChild(nameElement);
    opinionDiv.appendChild(quoteElement);

    wrapper.appendChild(opinionDiv);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const opinions = await fetchOpinions("src/studentOpinions.json");
    populateOpinions(opinions);
  } catch (error) {
    console.error("Error loading opinions:", error);
  }
});
