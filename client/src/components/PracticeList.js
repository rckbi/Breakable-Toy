import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PracticeTile from "./ PracticeTile";

const PracticeListPage = (props) => {
  const [practices, setPractices] = useState([]);

  const getPractices = async () => {
    try {
      const response = await fetch("/api/v1/practices");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedPractices = await response.json();
      setPractices(parsedPractices.practices);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getPractices();
  }, []);

  const practiceTileComponents = practices.map((practiceObject) => {
    return (
      <PracticeTile
        key={practiceObject.id}
        id={practiceObject.id}
        name={practiceObject.name}
        userId={practiceObject.userId}
      />
    );
  });

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x grid-margin-y align-center">
        <div className="cell">
          <h1 className="title text-center">Practices</h1>
        </div>
        {practiceTileComponents}
      </div>
    </div>
  );
};

export default PracticeListPage;
