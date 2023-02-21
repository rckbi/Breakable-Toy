import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "./../services/translateServerErrors";

const NewPracticeForm = (props) => {
  const [newPractice, setNewPractice] = useState({
    name: "",
    location: {},
  });

  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState({
    status: false,
    id: null,
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    setNewPractice({
      ...newPractice,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const addPractice = async (event) => {
    event.preventDefault();

    let submitErrors = {};
    if (newPractice.title.trim() === "") {
      console.log(newPractice.title);
      submitErrors = {
        ...submitErrors,
        title: "Title can't be blank",
      };

      const newPracticeBody = new FormData();
      newPracticeBody.append("name", newPractice.name);

      try {
        const response = await fetch("/api/v1/practices", {
          method: "POST",
          headers: {
            Accept: "string",
          },
          body: newPracticeBody,
        });
        if (!response.ok) {
          if (response.status === 422) {
            const body = await response.json();
            const newErrors = translateServerErrors(body.errors);
            return setErrors(newErrors);
          } else {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
        }
        const body = await response.json();
        setShouldRedirect({
          status: true,
          id: body.practice.id,
        });
      } catch (error) {
        console.error(`Error in addMeme Fetch: ${error.message}`);
      }
    }

    if (shouldRedirect.status) {
      return <Redirect to={`/practices/${shouldRedirect.id}`} />;
    }

    return (
      <div className="grid-container">
        <div className="grid-x grid-margin-x align-center">
          <div className="cell medium-6">
            <h1>Add a Practice</h1>
            <ErrorList errors={errors} />
            <form onSubmit={addPractice}>
              <label>Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={newPractice.name}
              />
              <div className="button-group">
                <input className="button" type="submit" value="Add Practice" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
};

export default NewPracticeForm;
