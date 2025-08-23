import { useState } from "react";

export default function AddColumnButton({ onAddColumn }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  return (
    <>
      {isAdding ? (
        <input
          className="w-96 flex-shrink-0 bg-white rounded-lg shadow-md text-xl font-bold p-4 text-center self-start border-2"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
          autoFocus
          type="text"
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              onAddColumn(newColumnTitle);
              setNewColumnTitle("");
              setIsAdding(false);
            } else if (e.key == "Escape") {
              setIsAdding(false);
            }
          }}
          onBlur={() => {
            setIsAdding(false);
            setNewColumnTitle("");
          }}
        />
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-96 flex-shrink-0 bg-white rounded-lg shadow-md text-xl font-bold p-4 text-center self-start"
        >
          + Ajouter une colonne
        </button>
      )}
    </>
  );
}
