import React, { useState } from "react";
import "./App.css";
import Tabs from "./components/tabs/Tabs";
import Pokedex from "./components/Pokedex";
import DebouncedSearch from "./components/common/DebouncedSearch";

function App() {
  const [search, setSearch] = useState("");

  const tabs = [{ label: "Pokedex", content: <Pokedex search={search} /> }];

  return (
    <div className="App">
      <main className="App-main">
        <Tabs
          tabs={tabs}
          afterTabs={
            <DebouncedSearch
              id="searchInput"
              stopTyping={setSearch}
              placeholder={"Search"}
            />
          }
        />
      </main>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
