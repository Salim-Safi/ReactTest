import React, { useCallback, useEffect, useState } from "react";

const roles = [
  "Utilisateurs",
  "Administrateurs",
  "Modérateurs",
  "Comptable",
  "Directeur",
  "Secrétaire",
];

const Roles = () => {
  const [criteria, setCriteria] = useState("");
  const handleChange = useCallback((event) => {
    setCriteria(event.target.value);
  }, []);

  const [rolesFiltered, setRolesFiltered] = useState([]);

  useEffect(() => {
    setRolesFiltered(
      roles.filter((role) =>
        role.toLowerCase().includes(criteria.toLowerCase())
      )
    );
  }, [criteria]);

  return (
    <div>
      <h1>Liste des rôles</h1>
      <input
        className="form-control"
        type="text"
        placeholder="Recherche"
        value={criteria}
        onChange={handleChange}
      />
      <br />
      {rolesFiltered.length
        ? rolesFiltered.map((role, index) => <li key={index}>{role}</li>)
        : "Aucune correspondance à ce critère de recherche"}
    </div>
  );
};

export default Roles;
