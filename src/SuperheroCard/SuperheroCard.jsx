import React from "react";

export const SuperheroCard = ({ superhero, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(superhero.id);
  };

  return (
    <div className="superhero-card">
      <img
        src={require(`../images/${superhero.id}.jpg`).default}
        alt="Superman"
      />
      <div className="superhero-info">
        <h2>{superhero.nickname}</h2>
        <h3>{superhero.name}</h3>
        <p>{superhero.description}</p>
        <ul>
          {superhero.superpowers.map((power, index) => (
            <li key={index}>{power}</li>
          ))}
        </ul>
        <p>{superhero.phrase}</p>
      </div>
      <button className="delete-button" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};
