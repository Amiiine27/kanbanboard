import "./App.css";
import AddColumnButton from "./components/AddColumnButton";
import Column from "./components/Column";
import { useState, useEffect } from "react";

function App() {
  const [kanbanData, setKanbanData] = useState({
    column_0: {
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
    column_1: {
      title: "In Progress",
      cards: [
        {
          task: "Apprendre React",
          description: "Apprendre React pour créer des applications web",
        },
      ],
    },
    column_2: {
      title: "Done",
      cards: [],
    },
  });

  {
    /* CONTEXT MENU */
  }

  const [contextMenu, setContextMenu] = useState({
    show: false,
    position: { x: 0, y: 0 },
    type: null, // 'card' ou 'column'
    targetColumn: null, // nom de la colonne cliquée
    targetCardIndex: null, // index de la carte cliquée (null si colonne)
  });

  const closeContextMenu = () => {
    setContextMenu({
      show: false,
      position: { x: 0, y: 0 },
      type: null,
      targetColumn: null,
      targetCardIndex: null,
    });
  };

  const openContextMenu = (x, y, type, column, cardIndex = null) => {
    setContextMenu({
      show: true,
      position: { x, y },
      type,
      targetColumn: column,
      targetCardIndex: cardIndex,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Que faire ici ?
      closeContextMenu()
    };
  
    if (contextMenu.show) {
      // Ajouter l'event listener
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('drag', handleClickOutside)
    }
  
    return () => {
      // Nettoyer l'event listener
      document.removeEventListener('click', handleClickOutside)
    };
  }, [contextMenu]);

  {
    /* CARDS */
  }

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
    newKanbanData[columnName] = {
      ...kanbanData[columnName],
      cards: [...kanbanData[columnName].cards, newCard],
    };
    // 3. Mettre à jour l'état
    setKanbanData(newKanbanData);

    console.log("Function addCard Appelée");
  };

  const deleteCard = (columnName, cardIndex) => {
    const newColumnWithoutCard = kanbanData[columnName].cards.filter(
      (card, index) => index !== cardIndex
    );

    const newKanbanData = { ...kanbanData };
    newKanbanData[columnName] = {
      ...kanbanData[columnName],
      cards: newColumnWithoutCard,
    };

    setKanbanData(newKanbanData);
  };

  {
    /* COLUMNS */
  }

  const addColumn = (newTitle) => {
    // 1. Récupérer toutes les clés existantes : ["column_0", "column_1", "column_2"]
    const columnKeys = Object.keys(kanbanData);

    // 2. Extraire uniquement les numéros de chaque clé .split('_') → ["column", "0"] - [1] → "0"- parseInt("0") → 0
    const existingIds = columnKeys.map((key) => {
      // "column_2" → ["column", "2"] → prendre "2" → convertir en nombre 2
      return parseInt(key.split("_")[1]);
    });
    // Résultat : [0, 1, 2]

    // 3. Trouver le plus grand numéro et ajouter 1 pour éviter les doublons
    const nextId = Math.max(...existingIds) + 1;
    // Math.max(0, 1, 2) = 2, puis 2 + 1 = 3

    // 4. Créer la nouvelle clé de colonne
    const newColumnKey = `column_${nextId}`; // "column_3"

    // 5. Créer l'objet colonne avec sa structure
    const newColumn = {
      [newColumnKey]: {
        title: newTitle,
        cards: [],
      },
    };

    // 6. Fusionner avec les données existantes et mettre à jour l'état
    const newKanbanData = { ...kanbanData, ...newColumn };
    setKanbanData(newKanbanData);
  };

  const updateColumn = (columnName, newTitle) => {
    // ← columnName, pas columnIndex
    const newKanbanData = { ...kanbanData };
    newKanbanData[columnName] = {
      ...kanbanData[columnName], // ← Garde les cartes
      title: newTitle, // ← Met à jour juste le titre
    };
    setKanbanData(newKanbanData);
  };

  const deleteColumn = (columnName) => {
    const { [columnName]: deleted, ...newKanbanData } = kanbanData;
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
              onUpdateColumn={updateColumn}
              onDeleteCard={deleteCard}
              onDeleteColumn={deleteColumn}
              onOpenContextMenu={openContextMenu} // ← AJOUTER
              onCloseContextMenu={closeContextMenu} // ← AJOUTER
            />
          ))}

          <AddColumnButton onAddColumn={addColumn} />
        </div>
        {contextMenu && (
          <div // container du context menu
            className="fixed bg-white border shadow-lg z-50"
            style={{
              left: contextMenu.position.x,
              top: contextMenu.position.y,
            }}
          >
            {contextMenu.type === "card" && (
              <p // contenu du context menu
                className="text-red-500 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  // Que faire ici ?
                  // 1. Supprimer la carte
                  deleteCard(
                    contextMenu.targetColumn,
                    contextMenu.targetCardIndex
                  );
                  // 2. Fermer le menu
                  closeContextMenu();
                }}
              >
                Supprimer la carte
              </p>
            )}

            {contextMenu.type === "column" && (
              <p // contenu du context menu
                className="text-red-500 p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  // Que faire ici ?
                  // 1. Supprimer la carte
                  deleteColumn(contextMenu.targetColumn);
                  // 2. Fermer le menu
                  closeContextMenu();
                }}
              >
                Supprimer la colonne
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
