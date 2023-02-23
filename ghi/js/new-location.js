window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/states/";
  // Setting up Form
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Throwing an error to catch
      throw new Error(response.status);
    } else {
      const data = await response.json();

      // State selection generated
      const selectTag = document.getElementById("state");
      for (let state of data.states) {
        const option = document.createElement("option");
        let state_name = state.name;
        let state_abv = state.abbreviation;
        option.value = state_abv;
        option.innerHTML = state_name;
        selectTag.appendChild(option);
      }
    }
  } catch (e) {
    console.error("error", e);
  }

  // POSTing Form Data
  // Submission listener
  const formTag = document.getElementById("create-location-form");
  formTag.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(formTag);
    const json = JSON.stringify(Object.fromEntries(formData));
    const locationUrl = "http://localhost:8000/api/locations/";
    const fetchConfig = {
      method: "post",
      body: json,
      header: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
      formTag.reset();
      const newLocation = await response.json();
    }
  });
});
