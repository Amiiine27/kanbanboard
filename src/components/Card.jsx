import { useState, useEffect } from "react";

export default function Card({
  task,
  description,
  cardIndex,
  currentColumn,
  onMoveCard,
  onUpdateCard,
  onDeleteCard,
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(task);

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Synchroniser tempTitle avec les nouvelles props
  useEffect(() => {
    setTempTitle(task);
  }, [task]); // Se déclenche quand task change

  useEffect(() => {
    const handleClickOutside = () => {
      setShowContextMenu(false);
    };
    
    if (showContextMenu) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showContextMenu]);

  return (
    <div
      className="cursor-grab p-2"
      draggable={!isEditingTitle}
      onDragStart={(e) => {
        e.dataTransfer.setData("cardIndex", cardIndex);
        e.dataTransfer.setData("sourceColumn", currentColumn);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY }); // Position de la souris
        setShowContextMenu(true);
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
          {showContextMenu && (
            <div
              className="fixed bg-white border shadow-lg z-50"
              onContextMenu={(e) => e.stopPropagation()}
              style={{ left: menuPosition.x, top: menuPosition.y }}
            >
              <p
                className="text-red-500 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onDeleteCard(currentColumn, cardIndex);
                  setShowContextMenu(false);
                }}
              >
                Supprimer la carte
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
