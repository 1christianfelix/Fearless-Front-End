window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences/";
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      // Throwing an error to catch
      throw new Error("Response not ok");
    } else {
      const data = await response.json();
      // console.log(data);

      const conference = data.conferences[0];
      // console.log(conference);
      const nameTag = document.querySelector(".card-title");
      nameTag.innerHTML = conference.name;

      const detailUrl = `http://localhost:8000${conference.href}`;
      const detailResponse = await fetch(detailUrl);
      if (detailResponse.ok) {
        const details = await detailResponse.json();
        // console.log(details);

        const conferenceDescription = details.conference.description;
        const descriptionTag = document.querySelector(".card-text");
        descriptionTag.innerHTML = conferenceDescription;
      }
    }
  } catch (e) {
    console.error("error", e);
  }
});
