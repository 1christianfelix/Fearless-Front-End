import React, { useState, useEffect } from "react";

const ConferenceForm = () => {
  //creating states for each input
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [description, setDescription] = useState("");
  const [maxPresentations, setMaxPresentations] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [location, setLocation] = useState("");

  //fetch data
  const fetchData = async () => {
    const url = "http://localhost:8000/api/locations/";

    const response = await fetch(url);

    //set up location selection list
    if (response.ok) {
      const data = await response.json();
      // console.log(typeof data.locations);
      setLocations(data.locations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //create handlerfunctions to update
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleStartsChange = (event) => {
    const value = event.target.value;
    setStarts(value);
  };

  const handleEndsChange = (event) => {
    const value = event.target.value;
    setEnds(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleMaxPresentationsChange = (event) => {
    const value = event.target.value;
    setMaxPresentations(value);
  };

  const handleMaxAttendeesChange = (event) => {
    const value = event.target.value;
    setMaxAttendees(value);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  //implement custom submission functionality
  const handleSubmit = async (event) => {
    // parse data to a Conference readable json format
    event.preventDefault();
    const data = {
      name: name,
      starts: starts,
      ends: ends,
      description: description,
      max_presentations: maxPresentations,
      max_attendees: maxAttendees,
      location: location,
    };
    console.log(data);

    //POSTing to conferences
    const conferenceUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      header: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();
      console.log(newConference);
      setDescription("");
      setEnds("");
      setLocation("");
      setMaxAttendees("");
      setMaxPresentations("");
      setName("");
      setStarts("");
    }
  };

  // do a two way bind between value attribute and the current state within the html
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new conference</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input
                name="name"
                placeholder="Name"
                required
                type="text"
                id="name"
                className="form-control"
                onChange={handleNameChange}
                value={name}
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="starts"
                placeholder="Starts"
                required
                type="date"
                id="starts"
                className="form-control"
                onChange={handleStartsChange}
                value={starts}
              />
              <label htmlFor="name">Starts</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="ends"
                placeholder="Ends"
                required
                type="date"
                id="ends"
                className="form-control"
                onChange={handleEndsChange}
                value={ends}
              />
              <label htmlFor="name">Ends</label>
            </div>
            <div className="mb-3">
              <textarea
                name="description"
                placeholder="Description"
                required
                id="description"
                className="form-control"
                onChange={handleDescriptionChange}
                value={description}
              ></textarea>
            </div>
            <div className="form-floating mb-3">
              <input
                name="max_presentations"
                placeholder="Maximum presentations"
                required
                type="number"
                id="max_presentations"
                className="form-control"
                onChange={handleMaxPresentationsChange}
                value={maxPresentations}
              />
              <label htmlFor="room_count">Maximum presentations</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="max_attendees"
                placeholder="Maximum attendees"
                required
                type="number"
                id="max_attendees"
                className="form-control"
                onChange={handleMaxAttendeesChange}
                value={maxAttendees}
              />
              <label htmlFor="room_count">Maximum attendees</label>
            </div>
            <div className="mb-3">
              <select
                required
                name="location"
                id="location"
                className="form-select"
                onChange={handleLocationChange}
                value={location}
              >
                <option value="">Choose a location</option>
                {locations.map((location) => {
                  return (
                    <option
                      key={location["href"].match(/(\d+)/)[0]}
                      value={location["href"].match(/(\d+)/)[0]}
                    >
                      {location.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConferenceForm;
