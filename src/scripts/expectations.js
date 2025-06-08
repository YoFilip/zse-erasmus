async function fetchExpectations(file) {
  const response = await fetch(file);
  if (!response.ok) {
    console.error(`Failed to fetch ${file}:`, response.statusText);
    throw new Error(`Failed to load ${file} data`);
  }
  return await response.json();
}

function populateExpectations(testimonials) {
  const wrapper = document.querySelector(".expectations-wrapper");

  wrapper.innerHTML = "";

  testimonials.forEach((testimonial) => {
    const testimonialDiv = document.createElement("div");
    testimonialDiv.classList.add("expectations");

    const nameElement = document.createElement("h3");
    nameElement.classList.add("expectations-name");
    nameElement.textContent = `${testimonial.name}`;

    const quoteElement = document.createElement("blockquote");
    quoteElement.classList.add("expectations-quote");
    quoteElement.textContent = `"${testimonial.title}"`;

    testimonialDiv.appendChild(nameElement);
    testimonialDiv.appendChild(quoteElement);

    wrapper.appendChild(testimonialDiv);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const testimonials = await fetchExpectations(
      "src/studentExpectations.json"
    );
    populateExpectations(testimonials);
  } catch (error) {
    console.error("Error loading testimonials:", error);
  }
});
