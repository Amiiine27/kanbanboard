import "./App.css";
import Column from "./components/Column";

function App() {
  return (
    <>
      <div className="min-h-screen max-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Tableau Kanban</h1>
        <div className="flex gap-4 max-w-7xl mx-auto">
          <Column title="To Do" />
          <Column title="In Progress" />
          <Column title="Done" />
        </div>
      </div>
    </>
  );
}

export default App;
