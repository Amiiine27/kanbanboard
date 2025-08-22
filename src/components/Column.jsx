import { useState } from "react";
import Card from "./Card";

export default function Column({
  title,
  cardsTab,
  columnName,
  onMoveCard,
  onUpdateCard,
  onAddCard,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddCard = () => {
    onAddCard(columnName, newTaskTitle, "");
    setIsAdding(false);
    setNewTaskTitle("");
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewTaskTitle("");
  };

  return (
    <div
      className="w-96 flex-shrink-0 bg-white rounded-lg flex flex-col"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const cardIndex = parseInt(e.dataTransfer.getData("cardIndex"));
        const sourceColumn = e.dataTransfer.getData("sourceColumn");

        if (sourceColumn != columnName) {
          onMoveCard(cardIndex, sourceColumn, columnName);
        }
      }}
    >
      <h1 className="text-xl font-bold p-4 border-b border-gray-200 text-center">
        {title}
      </h1>

      <div className="flex-1 gap-5">
        {cardsTab.map((card, index) => (
          <Card
            key={index}
            task={card.task}
            description={card.description}
            cardIndex={index}
            currentColumn={columnName}
            onMoveCard={onMoveCard}
            onUpdateCard={onUpdateCard}
          />
        ))}
      </div>

      {/* Zone d'ajout - séparée des cartes */}

      {isAdding ? (
        <div className="bg-gray-50 rounded-lg p-3 border">
          <input
            type="text"
            placeholder="Titre de la tâche..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            autoFocus
            onBlur={() => {
              if (newTaskTitle === "") {
                handleCancel();
              } else {
                handleAddCard();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (newTaskTitle === "") {
                  handleCancel();
                } else {
                  handleAddCard();
                }
              }
              if (e.key === "Escape") {
                handleCancel();
              }
            }}
          />
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          + Ajouter une carte
        </button>
      )}
    </div>
  );
}
