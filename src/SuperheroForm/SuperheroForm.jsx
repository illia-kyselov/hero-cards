import React, { useState } from "react";

export const SuperheroForm = ({ onAdd }) => {
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [phrase, setPhrase] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Перевірка на валідність даних
    if (nickname && name && superpowers && phrase) {
      const newSuperhero = {
        nickname,
        name,
        description,
        superpowers: superpowers.split("\n"),
        phrase,
      };
      onAdd(newSuperhero);
      // Скидання значень полів після додавання
      setNickname("");
      setName("");
      setDescription("");
      setSuperpowers("");
      setPhrase("");
    }
  };

  return (
    <div className="wrapper">
      <form className="superhero-form" onSubmit={handleSubmit}>
        <h2>Form for adding a superhero:</h2>
        <div className="form-row">
          <label>
            Nickname:
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Superpowers:
            <textarea
              value={superpowers}
              onChange={(e) => setSuperpowers(e.target.value)}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Phrase:
            <textarea
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Add Superhero</button>
      </form>
    </div>
  );
};
