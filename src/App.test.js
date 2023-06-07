import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders superhero cards", () => {
  render(<App />);

  const superheroCards = screen.getAllByTestId("superhero-card");
  expect(superheroCards.length).toBeGreaterThan(0);
});

test("adds a superhero", () => {
  render(<App />);

  fireEvent.change(screen.getByLabelText("Nickname:"), {
    target: { value: "Spiderman" },
  });
  fireEvent.change(screen.getByLabelText("Name:"), {
    target: { value: "Peter Parker" },
  });
  fireEvent.change(screen.getByLabelText("Description:"), {
    target: { value: "A friendly neighborhood superhero" },
  });
  fireEvent.change(screen.getByLabelText("Superpowers:"), {
    target: { value: "Climbing walls\nWeb-slinging" },
  });
  fireEvent.change(screen.getByLabelText("Phrase:"), {
    target: { value: "With great power comes great responsibility" },
  });

  fireEvent.click(screen.getByText("Add Superhero"));

  const superheroCard = screen.getByText("Spiderman - Peter Parker");
  expect(superheroCard).toBeInTheDocument();
});

test("deletes a superhero", () => {
  render(<App />);

  const deleteButton = screen.getAllByTestId("delete-button")[0];

  fireEvent.click(deleteButton);

  const superheroCard = screen.queryByText("Spiderman - Peter Parker");
  expect(superheroCard).not.toBeInTheDocument();
});

test("updates a superhero", () => {
  render(<App />);

  const updateButton = screen.getAllByTestId("update-button")[0];

  fireEvent.click(updateButton);

  fireEvent.change(screen.getByLabelText("Nickname:"), {
    target: { value: "Updated Spiderman" },
  });
  fireEvent.change(screen.getByLabelText("Name:"), {
    target: { value: "Updated Peter Parker" },
  });

  fireEvent.click(screen.getByText("Update"));

  const superheroCard = screen.getByText(
    "Updated Spiderman - Updated Peter Parker"
  );
  expect(superheroCard).toBeInTheDocument();
});
