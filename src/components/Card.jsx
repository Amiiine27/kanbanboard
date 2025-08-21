import { useState } from "react";

export default function Card({task, description, cardIndex, currentColumn, onMoveCard}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [tempTitle, setTempTitle] = useState(task)
  const [tempDesc, setTempDesc] = useState(description)

  return (
    <div
      className="cursor-grab p-2"
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData("cardIndex", cardIndex);
        e.dataTransfer.setData("sourceColumn", currentColumn);
      }}
    >
      <div className="">
        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
          {isEditingTitle ?
            <input type="text" value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} />
            :
            <h2 className="text-lg font-bold mb-2" onDoubleClick={() => {setIsEditingTitle(true)}}>{task}</h2>}
            <p className="text-gray-600 truncate">{description}</p>
        </div>
      </div>
    </div>
  );
}
