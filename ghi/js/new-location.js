window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/states/";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Throwing an error to catch
      throw new Error(response.status);
    } else {
      const data = await response.json();
      console.log(data);
      const selectTag = document.getElementById("state");
      for (let state of data.states) {
        console.log(state);
        const option = document.createElement("option");
        let state_name = Object.keys(state)[0];
        let state_abv = state[state_name];
        option.value = state_abv;
        option.innerHTML = state_name;
        selectTag.appendChild(option);
      }
    }
  } catch (e) {
    console.error("error", e);
  }
});
