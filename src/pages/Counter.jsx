import React, { useCallback, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [historique, setHistorique] = useState([]);

  const histoCounter = useCallback(
    (newCount) => {
      setHistorique([...historique, count]);
      setCount(newCount);
    },
    [count, historique]
  );

  return (
    <div>
      {count} : le compteur est {count % 2 ? "impair" : "pair"} <br />
      <button
        className="btn btn-danger me-1"
        onClick={() => histoCounter(count + 1)}
      >
        {" "}
        +{" "}
      </button>
      <button
        className="btn btn-success"
        onClick={() => histoCounter(count - 1)}
      >
        {" "}
        -{" "}
      </button>
      {historique.map((histo, index) => (
        <div key={index}>
          Valeur {index}: {histo}
        </div>
      ))}
    </div>
  );
}

export default Counter;
