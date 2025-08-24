import { useState, useEffect } from "react";
import Card from "./Card";

export default function Column({
  title,
  cardsTab,
  columnName,
  onMoveCard,
  onUpdateCard,
  onAddCard,
  onUpdateColumn,
  onDeleteCard
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [isEditingColumnTitle, setIsEditingColumnTitle] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState(title);

  const handleAddCard = () => {
    onAddCard(columnName, newTaskTitle, "");
    setIsAdding(false);
    setNewTaskTitle("");
  };

  const handleTaskCancel = () => {
    setIsAdding(false);
    setNewTaskTitle("");
  };

  const handleColumnCancel = () => {
    setIsEditingColumnTitle(false);
    setNewColumnTitle(title);
  };

  useEffect(() => {
    setNewColumnTitle(title);
  }, [title]);

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

      draggable
    >
      {isEditingColumnTitle ? (
        <input
          className="w-96 flex-shrink-0 bg-white rounded-lg shadow-md text-xl font-bold p-4 text-center self-start border-2"
          type="text"
          onChange={(e) => setNewColumnTitle(e.target.value)}
          value={newColumnTitle}
          autoFocus
          onBlur={() => {
            handleColumnCancel()
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              setIsEditingColumnTitle(false)
              onUpdateColumn(columnName, newColumnTitle)
            } else if (e.key == "Escape") {
              handleColumnCancel()
            }
          }}
        />
      ) : (
        <h1
          className="text-xl font-bold p-4 border-b border-gray-200 text-center"
          onDoubleClick={() => {
            setIsEditingColumnTitle(true);
          }}
        >
          {title}
        </h1>
      )}

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
            onDeleteCard={onDeleteCard}
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
                handleTaskCancel();
              } else {
                handleAddCard();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (newTaskTitle === "") {
                  handleTaskCancel();
                } else {
                  handleAddCard();
                }
              }
              if (e.key === "Escape") {
                handleTaskCancel();
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
