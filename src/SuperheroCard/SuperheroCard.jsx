import React, { useState } from "react";
import { SuperheroEditForm } from "../SuperheroEditForm/SuperheroEditForm";

export const SuperheroCard = ({ superhero, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteClick = () => {
    onDelete(superhero.id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = (updatedSuperhero) => {
    setIsEditing(false);
    onUpdate(updatedSuperhero);
  };

  return (
    <div className="superhero-card" onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <SuperheroEditForm superhero={superhero} onUpdate={handleUpdate} />
      ) : (
        <>
          <img src={`/images/${superhero.id}.jpg`} alt={superhero.nickname} />
          <div className="superhero-info">
            <h2>{superhero.nickname}</h2>
            <h3>{superhero.name}</h3>
            <p className="hero__description">{superhero.description}</p>
            <h4 className="title__block">
              {superhero.nickname} superpowers is:
            </h4>
            <ul className="superpowers">
              {superhero.superpowers.map((power, index) => (
                <li key={index}>{power}</li>
              ))}
            </ul>
            <h4 className="title__block">{superhero.nickname} phrase is:</h4>
            <p className="phraseBlock__superhero">{superhero.phrase}</p>
          </div>
          <button className="delete-button" onClick={handleDeleteClick}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};
