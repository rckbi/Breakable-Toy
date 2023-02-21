import React, { useState, useEffect } from "react";

import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";
import SetTile from "./SetTile";
import NewSetForm from "./NewSetForm";

const PracticeShowPage = (props) => {
  const [practice, setPractice] = useState({ sets: [] });
  const [errors, setErrors] = useState([]);

  const practiceId = props.match.params.id;
  const currentUser = props.currentUser;

  const getPractice = async () => {
    try {
      const response = await fetch(`/api/v1/practices/${practiceId}`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const parsedResponse = await response.json();
      setPractice(parsedResponse.practice);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getPractice();
  }, []);

  const postSet = async (newSetData) => {
    try {
      const response = await fetch(`/api/v1/practices/${practiceId}/sets`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newSetData),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      } else {
        const body = await response.json();
        const updatedSets = practice.sets.concat(body.sets);
        setErrors([]);
        setPractice({ ...practice, sets: updatedSets });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const deleteSet = async (setId) => {
    try {
      const response = await fetch(`/api/v1/sets/${setId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      setPractice({
        ...practice,
        sets: practice.sets.filter((set) => set.id !== setId),
      });
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const setTileComponents = practice.sets.map((setObject) => {
    return (
      <SetTile
        key={setObject.id}
        {...setObject}
        onDelete={deleteSet}
        currentUser={currentUser}
        setPractice={setPractice}
        practice={practice}
      />
    );
  });

  let form;
  if (currentUser) {
    form = <NewSetForm postSet={postSet} />;
  }

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x align-center">
        <div className="cell medium-6">
          <h1>{practice.title}</h1>
          <ul>{setTileComponents}</ul>
          <ErrorList errors={errors} />
          {form}
        </div>
      </div>
    </div>
  );
};

export default PracticeShowPage;
