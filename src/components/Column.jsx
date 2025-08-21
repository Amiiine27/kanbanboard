import Card from "./Card";

export default function Column({ title, cardsTab, columnName, onMoveCard }) {
  return (
    <div
      className="w-1/3 bg-white rounded-lg min-h-96"
      onDragOver={(e) => {
        // Que faire ici pour autoriser le drop ?
        e.preventDefault()
      }}
      onDrop={(e) => {
        e.preventDefault()

        // Que faire ici pour autoriser le drop ?
        const cardIndex = parseInt(e.dataTransfer.getData("cardIndex"))
        const sourceColumn = e.dataTransfer.getData("sourceColumn")

        onMoveCard(cardIndex, sourceColumn, columnName)
      }}
    >
      <h1 className="text-xl font-bold p-4 border-b border-gray-200 text-center">
        {title}
      </h1>
      <div className="gap-5">
        {cardsTab.map((card, index) => (
          <Card
            key={index}
            task={card.task}
            description={card.description}
            cardIndex={index} // ← L'index de la carte
            currentColumn={columnName} // ← Le nom de cette colonne
            onMoveCard={onMoveCard} // ← Nouveau (mais d'où ça vient ?)
          />
        ))}
      </div>
    </div>
  );
}
