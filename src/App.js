import React, { useEffect, useState } from "react";
import { SuperheroCard } from "./SuperheroCard";
import { SuperheroForm } from "./SuperheroForm";

const App = () => {
  const [superheroes, setSuperheroes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/heroes")
      .then((response) => response.json())
      .then((data) => setSuperheroes(data))
      .catch((error) => console.error("Error fetching heroes:", error));
  }, []);

  const handleAddSuperhero = (newSuperhero) => {
    fetch("http://localhost:8080/heroes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSuperhero),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuperheroes([...superheroes, data]);
      })
      .catch((error) => console.error("Error adding superhero:", error));
  };

  const handleDeleteSuperhero = (superheroId) => {
    fetch(`http://localhost:8080/heroes/${superheroId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedSuperheroes = superheroes.filter(
          (superhero) => superhero.id !== superheroId
        );
        setSuperheroes(updatedSuperheroes);
      })
      .catch((error) => console.error("Error deleting superhero:", error));
  };

  const handleUpdateSuperhero = (updatedSuperhero) => {
    fetch(`http://localhost:8080/heroes/${updatedSuperhero.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSuperhero),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedSuperheroes = superheroes.map((superhero) =>
          superhero.id === data.id ? data : superhero
        );
        setSuperheroes(updatedSuperheroes);
      })
      .catch((error) => console.error("Error updating superhero:", error));
  };

  return (
    <>
      <h1 className="title">Superheroes:</h1>
      <div className="wrapper">
        <div className="superheroes-list">
          {superheroes.map((superhero) => (
            <SuperheroCard
              key={superhero.id}
              superhero={superhero}
              onDelete={handleDeleteSuperhero}
              onUpdate={handleUpdateSuperhero}
            />
          ))}
        </div>
      </div>
      <SuperheroForm onAdd={handleAddSuperhero} />
    </>
  );
};

export default App;
