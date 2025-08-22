import { useState, useEffect } from "react";

export default function Card({
  task,
  description,
  cardIndex,
  currentColumn,
  onMoveCard,
  onUpdateCard
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(task);

  // Synchroniser tempTitle avec les nouvelles props
  useEffect(() => {
    setTempTitle(task);
  }, [task]); // Se déclenche quand task change

  return (
    <div
      className="cursor-grab p-2"
      draggable={!isEditingTitle}
      onDragStart={(e) => {
        e.dataTransfer.setData("cardIndex", cardIndex);
        e.dataTransfer.setData("sourceColumn", currentColumn);
      }}
    >
      <div className="">
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
          {isEditingTitle ? (
            <input
            className="border-2 rounded-md text-lg font-bold mb-2"
              type="text"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onBlur={() => {
                setIsEditingTitle(false);
                onUpdateCard(cardIndex, currentColumn, tempTitle);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  setIsEditingTitle(false);
                  onUpdateCard(cardIndex, currentColumn, tempTitle);
                }
              }}
            />
          ) : (
            <h2
              className="text-lg font-bold mb-2"
              onDoubleClick={() => {
                setIsEditingTitle(true);
              }}
            >
              {tempTitle}
            </h2>
          )}
          <p
            onMouseDown={(e) => e.stopPropagation()}
            className="text-gray-600 truncate"
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
