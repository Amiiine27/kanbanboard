import "./App.css";
import Column from "./components/Column";

function App() {

  var tasks = [
    { task: "Se laver les dents", description: "Se brosser les dents, passer le fil dentaire et le jet dentaire" },
    { task: "Aller a la salle de sport", description: "Séance pecs triceps"}
  ]

  console.log(tasks);

  return (
    <>
      <div className="min-h-screen max-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Tableau Kanban</h1>
        <div className="flex gap-4 max-w-7xl mx-auto">
          <Column title="To Do" cardsTab={tasks}/>
          <Column title="In Progress" cardsTab={tasks}/>
          <Column title="Done" cardsTab={tasks}/>
        </div>
      </div>
    </>
  );
}

export default App;
