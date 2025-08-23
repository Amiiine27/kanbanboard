import "./App.css";
import AddColumnButton from "./components/AddColumnButton";
import Column from "./components/Column";
import { useState, useEffect } from "react";

function App() {
  const [kanbanData, setKanbanData] = useState({
    todo: {
      title: "To Do",
      cards: [
        // ← Il faut "cards:" avant le tableau !
        {
          task: "Se laver les dents",
          description:
            "Se brosser les dents, passer le fil dentaire et le jet dentaire",
        },
        {
          task: "Aller a la salle de sport",
          description: "Séance pecs triceps",
        },
        {
          task: "Faire les courses",
          description: "Acheter du pain, du lait, des oeufs",
        },
      ],
    },
    inProgress: {
      title: "In Progress",
      cards: [
        {
          task: "Apprendre React",
          description: "Apprendre React pour créer des applications web",
        },
      ],
    },
    done: {
      title: "Done",
      cards: [],
    },
  });

  const moveCard = (cardIndex, startColumn, endColumn) => {
    // On recupere la carte a déplacer
    const cardToMove = kanbanData[startColumn].cards[cardIndex];

    // On supprime la carte de son emplacement actuel
    const newStartColumnCards = kanbanData[startColumn].cards.filter(
      (card, index) => index !== cardIndex
    );

    // Ajouter la carte à la colonne de destination
    const newEndColumnCards = [...kanbanData[endColumn].cards, cardToMove];

    setKanbanData({
      ...kanbanData,
      [startColumn]: { ...kanbanData[startColumn], cards: newStartColumnCards },
      [endColumn]: { ...kanbanData[endColumn], cards: newEndColumnCards },
    });

    console.log("Function moveCard Appelée");
  };

  const updateCard = (cardIndex, column, newTitle) => {
    const currentCard = kanbanData[column].cards[cardIndex];

    const updatedCard = {
      task: newTitle,
      description: currentCard.description,
    };

    const newKanbanData = { ...kanbanData };
    newKanbanData[column].cards[cardIndex] = updatedCard;

    setKanbanData(newKanbanData);

    console.log("Function updateCard Appelée");
  };

  const addCard = (columnName, newTask, newDescription) => {
    // Que faire ?
    // 1. Créer la nouvelle carte
    const newCard = {
      task: newTask,
      description: newDescription,
    };
    // 2. L'ajouter à la bonne colonne
    const newKanbanData = { ...kanbanData };
    newKanbanData[columnName] = [...kanbanData[columnName].cards, newCard];
    // 3. Mettre à jour l'état
    setKanbanData(newKanbanData);

    console.log("Function addCard Appelée");
  };

  const addColumn = (newTitle) => {
    const nextId = Object.keys(kanbanData).length; // = 3
    const newColumnKey = `column_${nextId}`;

    const newColumn = {
      [newColumnKey]: {
        title: newTitle,
        cards: [],
      },
    };

    const newKanbanData = {...kanbanData, ...newColumn};
    setKanbanData(newKanbanData);
  };

  return (
    <>
      <div className="h-screen bg-gray-100 p-4 flex flex-col">
        <h1 className="text-2xl font-bold text-center mb-4">Tableau Kanban</h1>
        <div className="flex gap-4 flex-1 justify-start overflow-x-auto min-w-0">
          {Object.keys(kanbanData).map((columnName) => (
            // Qu'est-ce que tu mets ici ?
            // Comment tu crées un <Column> avec les bonnes props ?

            <Column
              title={kanbanData[columnName].title}
              cardsTab={kanbanData[columnName].cards}
              columnName={columnName}
              onMoveCard={moveCard}
              onAddCard={addCard}
              onUpdateCard={updateCard}
            />
          ))}

          <AddColumnButton onAddColumn={addColumn}/>
        </div>
      </div>
    </>
  );
}

export default App;
