window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/locations/";
  try {
    // fetch url
    const response = await fetch(url);
    if (!response.ok) {
      // Throwing an error to catch
      throw new Error(response.status);
    } else {
      // parse json response
      const data = await response.json();

      // Location selection generation
      console.log(data);
      const selectTag = document.getElementById("location");
      for (let location_info of data["locations"]) {
        // creating selection options
        const option = document.createElement("option");
        let location_name = location_info["name"];
        /*\d: This is a special character class that matches any digit character. It is equivalent to the character set [0-9]. Note that the backslash \ is used to escape the d character, as d by itself would be interpreted as a literal character.
        +: This is a quantifier that matches one or more occurrences of the preceding character or group. In this case, it specifies that \d should be matched one or more times.*/
        let location_href = location_info["href"].match(/(\d+)/)[0];
        option.innerHTML = location_name;
        option.value = location_href;
        selectTag.appendChild(option);
      }
      console.log("test");
      console.log(selectTag);
    }
  } catch (e) {
    console.error("error", e);
  }

  // POST form data
  // listening for submission
  const formTag = document.getElementById("create-conference-form");
  formTag.addEventListener("submit", async (event) => {
    event.preventDefault();
    // formData = name/value pairs from the inputs of the passed in form
    // We turn that
    const formData = new FormData(formTag);
    console.log(formData);
    const json = JSON.stringify(Object.fromEntries(formData));
    console.log(json);

    const conferenceUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
      method: "post",
      body: json,
      header: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
      formTag.reset();
      const newLocation = await response.json();
    }
  });
});
