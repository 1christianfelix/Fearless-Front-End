window.addEventListener("DOMContentLoaded", async () => {
  const selectTag = document.getElementById("conference");

  const url = "http://localhost:8000/api/conferences/";
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();

    for (let conference of data.conferences) {
      const option = document.createElement("option");
      option.value = conference.href;
      option.innerHTML = conference.name;
      selectTag.appendChild(option);
    }

    // Here, add the 'd-none' class to the loading icon
    const spinner = document.getElementById("loading-conference-spinner");
    spinner.classList.add("d-none");
    // Here, remove the 'd-none' class from the select tag
    selectTag.classList.remove("d-none");
  }

  // POSTing Form Data
  // Submission listener
  const formTag = document.getElementById("create-attendee-form");
  formTag.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(formTag);
    console.log(formData);
    let data = Object.fromEntries(formData);
    const json = JSON.stringify(data);
    console.log(data);
    console.log(json);
    const attendeeUrl = `http://localhost:8001/${data["conference"]}attendees/`;
    const fetchConfig = {
      method: "post",
      body: json,
      header: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(attendeeUrl, fetchConfig);
    if (response.ok) {
      formTag.reset();
      const success = document.getElementById("success-message");
      success.classList.remove("d-none");
      formTag.classList.add("d-none");
    }
  });
});
