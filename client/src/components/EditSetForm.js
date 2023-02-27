import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";

const EditSetForm = ({ editSet, content, id }) => {
  const [set, setSet] = useState({
    content: content,
  });
  const [errors, setErrors] = useState([]);

  const handleContentChange = (event) => {
    setSet({
      ...set,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    editSet(id, set);
  };

  return (
    <>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label>
          Review:
          <textarea
            name="content"
            rows={4}
            cols={40}
            onChange={handleContentChange}
            value={review.content || ""}
          />
        </label>
        <input type="submit" className="button" value="Submit" />
      </form>
    </>
  );
};

export default EditSetForm;
