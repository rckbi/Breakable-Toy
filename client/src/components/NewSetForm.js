import React, { useState } from "react";

const NewSetForm = ({ postSet }) => {
  const [newSet, setNewSet] = useState({
    content: "",
  });

  const handleSetChange = (event) => {
    setNewSet({
      ...newSet,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postSet(newSet);
    clearForm();
  };

  const clearForm = () => {
    setNewSet({
      content: "",
    });
  };

  return (
    <div className="cell medium-6">
      <h1>Add a Set</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Set:
          <textarea
            name="content"
            rows={4}
            cols={40}
            onChange={handleSetChange}
            value={newSet.content}
          />
        </label>

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default NewSetForm;
