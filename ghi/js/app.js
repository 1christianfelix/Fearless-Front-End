function createCard(name, description, pictureUrl, starts, ends, location) {
  return `
    <div class="col-4 mb-2">
      <div class="card shadow">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
          ${starts} - ${ends}
        </div>
      </div>
    </div>
  `;
}

var alertPlaceholder = document.getElementById("liveAlertPlaceholder");
function alert(message, type) {
  var wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="alert mb-0 alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

  alertPlaceholder.append(wrapper);
}

window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences/5765";
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      // Throwing an error to catch
      throw new Error(response.status);
    } else {
      const data = await response.json();

      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        console.log(conference);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          console.log(details);
          const name = details.conference.name;
          console.log(name);
          const description = details.conference.description;
          console.log(description);
          const pictureUrl = details.conference.location.picture_url;
          console.log(pictureUrl);
          const conferenceStart = new Date(
            details.conference.starts
          ).toDateString();
          const conferenceEnd = new Date(
            details.conference.ends
          ).toDateString();
          const location = details.conference.location.name;
          const html = createCard(
            name,
            description,
            pictureUrl,
            conferenceStart,
            conferenceEnd,
            location
          );
          const column = document.querySelector(".row");
          column.innerHTML += html;
        }
      }
    }
  } catch (e) {
    alert(`${e} Could not fetch the url`, "danger");
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
