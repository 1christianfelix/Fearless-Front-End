import React, { useState, useEffect } from "react";

const AttendConference = () => {
  //Get list of conferences
  //Once you have that list, use boolean statement regarding the list size as empty of not to decide if list or loading shows
  const [conferences, setConferences] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [conference, setConference] = useState("");

  //handlers
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleConferenceChange = (event) => {
    const value = event.target.value;
    setConference(value);
  };

  //fetch data
  const fetchData = async () => {
    const url = "http://localhost:8000/api/conferences/";

    const response = await fetch(url);

    //set up location selection list
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setConferences(data.conferences);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //POSTing/submission
  const handleSubmit = async () => {
    const data = {
      name: name,
      email: email,
      conference: conference,
    };

    // POSTING

    //get url
    //configure the fetch request
    const attendeeUrl = `http://localhost:8001/${data["conference"]}attendees/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      header: {
        "Content-Type": "application/json",
      },
    };

    //fetch the data
    const response = await fetch(attendeeUrl, fetchConfig);
    if (response.ok) {
      const newAttendee = await response.json();
      console.log(newAttendee);
      setName("");
      setEmail("");
      setConference("");
    }
  };
  //dealing with boolean classes
  let loading_className = "d-flex justify-content-center mb-3";
  let conferences_className = "form-select d-none";
  if (conferences.length > 0) {
    loading_className = "d-flex justify-content-center mb-3 d-none";
    conferences_className = "form-select";
  }

  return (
    <div className="my-5">
      <div className="row">
        <div className="col col-sm-auto">
          <img
            width="300"
            className="bg-white rounded shadow d-block mx-auto mb-4"
            src="./logo.svg"
          />
        </div>
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit} id="create-attendee-form">
                <h1 className="card-title">It's Conference Time!</h1>
                <p className="mb-3">
                  Please choose which conference you'd like to attend.
                </p>
                <div
                  className={loading_className}
                  id="loading-conference-spinner"
                >
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div className="mb-3">
                  <select
                    name="conference"
                    id="conference"
                    className={conferences_className}
                    required
                    onChange={handleConferenceChange}
                    value={conference}
                  >
                    <option value="">Choose a conference</option>
                    {conferences.map((conference) => {
                      return (
                        <option key={conference.href} value={conference.href}>
                          {conference.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <p className="mb-3">Now, tell us about yourself.</p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        required
                        placeholder="Your full name"
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleNameChange}
                        value={name}
                      />
                      <label htmlFor="name">Your full name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input
                        required
                        placeholder="Your email address"
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        onChange={handleEmailChange}
                        value={email}
                      />
                      <label htmlFor="email">Your email address</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-lg btn-primary">I'm going!</button>
              </form>
              <div
                className="alert alert-success d-none mb-0"
                id="success-message"
              >
                Congratulations! You're all signed up!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendConference;
