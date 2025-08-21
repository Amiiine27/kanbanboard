import "./App.css";
import Column from "./components/Column";
import { useState, useEffect } from "react";

function App() {
  const [kanbanData, setKanbanData] = useState({
    todo: [
      {
        task: "Se laver les dents",
        description:
          "Se brosser les dents, passer le fil dentaire et le jet dentaire",
      },
      { task: "Aller a la salle de sport", description: "Séance pecs triceps" },
      {
        task: "Faire les courses",
        description: "Acheter du pain, du lait, des oeufs",
      },
    ],
    inProgress: [
      {
        task: "Apprendre React",
        description: "Apprendre React pour créer des applications web",
      },
    ],
    done: [],
  });

  const moveCard = (cardIndex, startColumn, endColumn) => {
    // On recupere la carte a déplacer
    const cardToMove = kanbanData[startColumn][cardIndex];

    // On supprime la carte de son emplacement actuel
    const newStartColumnCards = kanbanData[startColumn].filter(
      (card, index) => index !== cardIndex
    );

    // Ajouter la carte à la colonne de destination
    const newEndColumnCards = [...kanbanData[endColumn], cardToMove];

    setKanbanData({
      ...kanbanData,
      [startColumn]: newStartColumnCards,
      [endColumn]: newEndColumnCards,
    });

    console.log("Function moveCard Appelée");
  };

  
  return (
    <>
      <div className="min-h-screen max-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Tableau Kanban</h1>
        <div className="flex gap-4 max-w-7xl mx-auto">
          <Column
            title="To Do"
            cardsTab={kanbanData.todo}
            columnName="todo" // ← Le nom technique de la colonne
            onMoveCard={moveCard} // ← La fonction qu'on a créée
          />
          <Column
            title="In Progress"
            cardsTab={kanbanData.inProgress}
            columnName="inProgress" // ← Le nom technique
            onMoveCard={moveCard} // ← La même fonction
          />
          <Column
            title="Done"
            cardsTab={kanbanData.done}
            columnName="done" // ← Le nom technique
            onMoveCard={moveCard} // ← La même fonction
          />
        </div>
      </div>
    </>
  );
}

export default App;
