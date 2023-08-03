import { render, screen } from "@testing-library/react";
import Roles from "./Roles";

test("affiche le titre", () => {
  render(<Roles />);
  const linkElement = screen.getByText("Liste des rôles");
  expect(linkElement).toBeInTheDocument();
});

test("affiche un élément de la liste", () => {
  render(<Roles />);
  const linkElement = screen.getByText("Utilisateurs");
  expect(linkElement).toBeInTheDocument();
});
