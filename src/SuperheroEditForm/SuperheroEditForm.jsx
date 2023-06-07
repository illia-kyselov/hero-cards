import React, { useState } from "react";

export const SuperheroEditForm = ({ superhero, onUpdate }) => {
  const [editedSuperhero, setEditedSuperhero] = useState(superhero);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedSuperhero((prevSuperhero) => ({
      ...prevSuperhero,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(editedSuperhero);
  };

  return (
    <form onSubmit={handleSubmit} className="superhero-form--update">
      <h2 className="title-update">Edit Superhero</h2>
      <div className="name-update">
        <label htmlFor="nickname">Nickname:</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={editedSuperhero.nickname}
          onChange={handleChange}
        />
      </div>
      <div className="name-update">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedSuperhero.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          className="textarea-update"
          value={editedSuperhero.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="superpowers">Superpowers:</label>
        <textarea
          type="text"
          className="textarea-update__superpowers"
          id="superpowers"
          name="superpowers"
          value={editedSuperhero.superpowers.join(", ")}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phrase">Phrase:</label>
        <textarea
          type="text"
          className="textarea-update__phrase"
          id="phrase"
          name="phrase"
          value={editedSuperhero.phrase}
          onChange={handleChange}
        />
      </div>
      <div className="button-update-container">
        <button type="submit" className="button-update">
          Update
        </button>
      </div>
    </form>
  );
};
