import "./App.css";
import Tabs from "./components/tabs/Tabs";
import Pokedex from "./components/Pokedex";

function App() {
  const tabs = [
    { label: "Pokedex", content: <Pokedex /> }
  ];

  return (
    <div className="App">
      <main className="App-main">
        <Tabs tabs={tabs} />
      </main>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
