import { render, screen } from "@testing-library/react";
import UserList from "./UserList";
import axios from "axios";

jest.mock("axios");

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

test("affiche le titre", async () => {
  const mockUsers = [
    { name: "Eva" },
    { name: "Aude" },
    { name: "Anne" },
    { name: "Marc" },
  ];
  const mockRes = { data: mockUsers };
  axios.get.mockResolvedValue(mockRes);
  render(<UserList />);
  await screen.findByText("Eva");
  const linkElement = screen.getByText("Eva");
  expect(linkElement).toBeInTheDocument();
});
