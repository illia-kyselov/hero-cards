import React, { useEffect, useState } from "react";
import { SuperheroCard } from "./SuperheroCard";
import { SuperheroForm } from "./SuperheroForm";

const App = () => {
  const [superheroes, setSuperheroes] = useState([]);

  useEffect(() => {
    fetch("/heroes")
      .then((response) => response.json())
      .then((data) => setSuperheroes(data))
      .catch((error) => console.error("Error fetching heroes:", error));
  }, []);

  const handleAddSuperhero = (newSuperhero) => {
    fetch("/heroes/add", {
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
    fetch(`/heroes/${superheroId}`, {
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

  return (
    <>
      <div>
        <h1 className="title">Superheroes:</h1>
        <div className="superheroes-list">
          {superheroes.map((superhero) => (
            <SuperheroCard
              key={superhero.id}
              superhero={superhero}
              onDelete={handleDeleteSuperhero}
            />
          ))}
        </div>
      </div>
      <SuperheroForm onAdd={handleAddSuperhero} />
    </>
  );
};

export default App;
