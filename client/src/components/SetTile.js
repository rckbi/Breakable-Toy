import React, { useState, useEffect } from "react";
import EditSetForm from "./EditSetForm";
import ErrorList from "./layout/ErrorList";

const SetTile = ({ content, onDelete, id, currentUser, userId, setPractice, practice }) => {
  const [shouldEditForm, setShouldEditForm] = useState(false);
  const [errors, setErrors] = useState([]);
  const [userName, setUserName] = useState("");

  const getUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedUser = await response.json();
      setUserName(parsedUser.user.userName);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleEditButton = (event) => {
    event.preventDefault();
    if (shouldEditForm) {
      setShouldEditForm(false);
    } else {
      setShouldEditForm(true);
    }
  };

  const handleDeleteButton = (event) => {
    event.preventDefault();
    onDelete(id);
  };

  const editSet = async (setId, setData) => {
    try {
      const response = await fetch(`/api/v1/practiceSets/${setId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(setData),
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
        setErrors([]);
        const editedSets = practice.sets;
        const editedId = editedSets.findIndex((set) => set.id === body.set.id);
        editedSets[editedId] = body.set;
        setPractice({ ...practice, sets: editedSets });
        setShouldEditForm(false);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  let setControls;
  if (currentUser && currentUser.id === userId) {
    setControls = (
      <>
        <i
          className="icon fa-regular fa-pen-to-square"
          title="Edit Set"
          onClick={handleEditButton}
        />
        <i
          className="icon fa-regular fa-trash-can"
          title="Delete Set"
          onClick={handleDeleteButton}
        />
      </>
    );
  }

  let editFormRender;
  if (shouldEditForm) {
    editFormRender = <EditSetForm content={content} id={id} editSet={editSet} />;
  }

  return (
    <>
      <li>
        <p className="review-header">
          <strong>{userName}</strong> {setControls}
        </p>
        <p className="review-body">{content}</p>
      </li>
      <ErrorList errors={errors} />
      {editFormRender}
    </>
  );
};

export default SetTile;
