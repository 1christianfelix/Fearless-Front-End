window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences/";
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      // Throwing an error to catch
      throw new Error(response.status);
    } else {
      const data = await response.json();
      // console.log(data);

      const conference = data.conferences[0];
      // console.log(conference);
      const nameTag = document.querySelector(".card-title");
      nameTag.innerHTML = conference.name;

      // Getting conference details
      const detailUrl = `http://localhost:8000${conference.href}`;
      const detailResponse = await fetch(detailUrl);
      if (detailResponse.ok) {
        const details = await detailResponse.json();
        console.log(details);

        const conferenceDescription = details.conference.description;
        const descriptionTag = document.querySelector(".card-text");
        descriptionTag.innerHTML = conferenceDescription;

        const conferencePicture_Url = details.conference.location.picture_url;
        const pictureTag = document.querySelector(".card-img-top");
        pictureTag.src = conferencePicture_Url;
      }
    }
  } catch (e) {
    console.error("error", e);
  }
});

// window.addEventListener("DOMContentLoaded", async () => {
//   const url = "http://localhost:8000/api/conferences/";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       // Figure out what to do when the response is bad
//       throw new Error(response.status);
//     } else {
//       const data = await response.json();
//     }
//   } catch (e) {
//     // Figure out what to do if an error is raised
//     console.error("error", e);
//   }
// });
